const http = require("http");
const fs = require("fs");
const url = require("url");

const my_server = http.createServer((req,res) => {
    if(req.url === "/favicon.ico") res.end();

    const log = `${Date.now()} : New req received at ${req.url}. Method : ${req.method}\n`;

    const my_url = url.parse(req.url, true);
    // console.log(my_url);

    fs.appendFile('log.txt', log, (err,data) => {
        switch(my_url.pathname) {
            case '/' : 
                res.end("homepage");
                break;
            case '/about' :
                const username = my_url.query.myname;
                res.end(`hello ${username}`);
                break;
            case '/signup' : 
                if(req.method === 'GET') res.end("this is a signup form\n");
                else if(req.method === 'POST') {
                    // db query
                    res.end("success");
                }
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