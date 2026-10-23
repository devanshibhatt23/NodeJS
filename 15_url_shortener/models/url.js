const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },

    shortUrl: {
        type: String,
        unique: true,
    },

    visitHistory: [{
        timestamps: { type: Number }
    }],

}, { timestamps: true });

const url = mongoose.model("url", urlSchema);

module.exports = {
    url,
};