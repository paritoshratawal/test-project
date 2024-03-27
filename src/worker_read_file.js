const user_dao = require('./dao/user.dao');
const policy_dao = require('./dao/policy.dao');
const agent_dao = require('./dao/agent.dao');

const { parentPort } = require('node:worker_threads');

const csv = require('csvtojson');


async function read_file(){
    const csvFilePath = `${__dirname}/../uploads/datasheet.csv`;
    const json_data = await csv().fromFile(csvFilePath);
    parentPort.postMessage(json_data);
}
read_file();
