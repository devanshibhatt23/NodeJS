// // const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id);
// }

require("dotenv").config();
const jwt = require("jsonwebtoken");

// comes from env file/config server at runtime
const secret = process.env.secret_key;

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if(!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch(error) {
        return null;
    }
}

 module.exports = {
    setUser,
    getUser,
};