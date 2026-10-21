const fs = require("fs");

function logRequestResponse(filename) {
    return (req,res,next) => {
        fs.appendFile(filename,
            `${Date.now()}: ${req.method} ${req.path} by user at ip address ${req.ip}\n`, (err,data) => {
        next();
        });
    }
}

module.exports = {
    logRequestResponse,
}