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

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }

}, { timestamps: true });

const url = mongoose.model("url", urlSchema);

module.exports = {
    url,
};