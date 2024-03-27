const ejs = require('ejs');
const { Worker } = require('worker_threads');
const user_dao = require('./dao/user.dao');
const policy_dao = require('./dao/policy.dao');
const agent_dao = require('./dao/agent.dao');

let connections = [];
module.exports = {
    db_operations: async (req, res) => {
        try {
            const json_data = await create_worker();
            json_data.forEach(async (data) => {
                const { agent, user__first_name, user__dob, user__address, user__phone_number, user__state,
                    user__zip_code, user__email, user__gender, user__user_type, user_account, policy_category,
                    policy_carrier, policy_info__policy_number, policy_info__policy_start_date,
                    policy_info__policy_end_date, policy_info__policy_category } = data;
                    
                    if(user__dob){
                        console.log(template_engine(user__first_name, new Date().getFullYear() - new Date(user__dob).getFullYear()));
                    }
                    
                const user_data = await insert_to_db('user', {
                    first_name: user__first_name,
                    dob: user__dob,
                    address: user__address,
                    phone_number: user__phone_number,
                    state: user__state,
                    zip_code: user__zip_code,
                    email: user__email,
                    gender: user__gender,
                    type: user__user_type,
                    account: user_account,
                });
                const policy_data = await insert_to_db('policy', {
                    carrier: policy_carrier,
                    policy_number: policy_info__policy_number,
                    policy_start_date: policy_info__policy_start_date,
                    policy_end_date: policy_info__policy_end_date,
                    category: policy_info__policy_category,
                    user_id: user_data._id
                });
                await insert_to_db('agent', {
                    agent_name: agent,
                    user_id: user_data._id,
                    policy_id: policy_data._id
                });
            });
            res.status(200).send({ "message": "File successfully uploaded" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ "message": "Internal Server Error" })
        }
    },
    long_polling: async(req, res) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        connections.push(res);
    }
}

async function create_worker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/./worker_read_file.js`);
        worker.on('message', resolve);
        worker.on('error', reject);
    })
}

async function insert_to_db(type, payload) {
    switch (type) {
        case 'user':
            return await user_dao.insert_record(payload)
            break;
        case 'policy':
            return await policy_dao.insert_record(payload)
            break;
        case 'agent':
            return await agent_dao.insert_record(payload)
            break;
        default:
            break;
    }
}

function template_engine(user_name, age){
    let str = ejs.render("Hello! my name is <%= user_name %>. i'm <%= age %> years old.", {user_name: user_name, age: age.toString()})
    return str;
}

/******************************LONG POLLING HTTP************************/
let tick = 0;
const LIMIT = 20;
const delay = 1000;
setTimeout(function run(){
    if(++tick  > LIMIT){
        connections.map(res => {
            res.write("END");
            res.end();
        });
        connections = [];
        tick = 0;
    }
    connections.map((res, i) => {
        res.write(`Hello ${i}! Tick ${tick} \n`)
    });
    setTimeout(run, delay);
})
/******************************END************************/

