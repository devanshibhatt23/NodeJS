const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,     
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const user = mongoose.model("user", userSchema);

module.exports = user;