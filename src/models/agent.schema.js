const mongoose = require('mongoose');
const user_model = require('./user.schema');
const policy_model = require('./policy.shema');

const schema = new mongoose.Schema({
    agent_name: {
        trim: true,
        type: String,
    },
    user_id: {
        default: null,
        ref: user_model,
        type: mongoose.Schema.Types.ObjectId,
    },
    policy_id: {
        default: null,
        ref: user_model,
        type: mongoose.Schema.Types.ObjectId,
    },
    created: {
        at: {
            default: Date.now,
            required: true,
            type: Date,
        }
    },
    modified: {
        at: {
            type: Date,
        },
        by: {
            type: String,
        },
    }
});

const agent_model = mongoose.model('agents', schema);

module.exports = agent_model;