const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const User = mongoose.model('user', user_schema)

module.exports = {
    User,
}