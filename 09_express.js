const express = require("express");
const http = require("http");
// express is a framework (which internally uses http module only) which automates handling of routes and http methods and makes the code clean 

// app works as a handler function passed as a callback function
const app = express();

app.get("/", (req,res) => {
    return res.send(`home page, hello ${req.query.name}`);
});

app.get("/about", (req,res) => {
    return res.send("about us");
});

// const my_server = http.createServer(app);

// my_server.listen(8000, () => {
//     console.log("server started");
// });

app.listen(8000, () => {
    console.log("server started");
}); 