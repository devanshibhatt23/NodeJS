const http = require("http");
const fs = require("fs");

const my_server = http.createServer((req,res) => {
    const log = `${Date.now()} : New req received\n`;

    fs.appendFile('log.txt', log, (err,data) => {
        switch(req.url) {
            case '/' : 
                res.end("homepage");
                break;
            case '/about' :
                res.end("hello");
                break;
            default : 
                res.end("404");
                break;
        }
    });
});

// port
my_server.listen(8000, () => {
    console.log("server started");
});