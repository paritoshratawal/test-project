const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        trim: true,
        type: String,
    },
    dob: {
        trim: true,
        type: String,
    },
    address: {
        trim: true,
        type: String,
    },
    phone_number: {
        trim: true,
        type: String,
    },
    state: {
        trim: true,
        type: String,
    },
    zip_code: {
        trim: true,
        type: String,
    },
    email: {
        match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        required: true,
        trim: true,
        type: String,
        unique: true,
    },
    gender: {
        trim: true,
        type: String,
    },
    type: {
        trim: true,
        type: String,
    },
    account: {
        trim: true,
        type: String,
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

const user_model = mongoose.model('users', schema);

module.exports = user_model;