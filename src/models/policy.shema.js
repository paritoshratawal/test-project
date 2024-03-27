const mongoose = require('mongoose');
const user_model = require('./user.schema');

const schema = new mongoose.Schema({
    carrier: {
        trim: true,
        type: String,
    },
    policy_number: {
        trim: true,
        type: String,
    },
    policy_start_date: {
        trim: true,
        type: String,
    },
    policy_end_date: {
        trim: true,
        type: String,
    },
    category: {
        trim: true,
        type: String,
    },
    user_id: {
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

const policy_model = mongoose.model('policies', schema);

module.exports = policy_model;