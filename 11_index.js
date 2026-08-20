const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// middleware - plugin
app.use(express.urlencoded({ extended: false }));

// middleware functions can execute any code, make changes to requests, responses, end the req-res cycle, call the next middleware func in stack - they have access to requests, response and next middleware function
app.use((req,res,next) => {
    console.log("middleware");
    req.myusername = "xyz";
    
    // return res.json({ msg: "middleware blocked your request"});
    next();
});

app.use((req,res,next) => {
    console.log("middleware", req.myusername);
    
    fs.appendFile("./11_log.txt", `${Date.now()}: ${req.method} ${req.path} by user at ip address ${req.ip}\n`, (err,data) => {
        next();
    });
});

app.get("/users", (req,res) => {
    const html = `
    <ul>
        ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;

    return res.send(html);
});

app.get("/api/users", (req,res) => {
    console.log(req.headers);

    // custom header (add X to custom header)
    res.setHeader("X-new-header", "xyz");
    return res.json(users);
});

app.post("/api/users", (req,res) => {
    const body = req.body;
    console.log(body);
    
    users.push({...body, id : users.length+1}); 

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status : "success - new user created with id:", id: users.length});
    });
});

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    return res.json(user);
})
.patch((req,res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user_idx = users.findIndex(user => user.id === id);

    users[user_idx] = {...users[user_idx], ...body};

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status : "success - user edited with id:", id: users.length});
    });
})
.delete((req,res) => {
    const id = Number(req.params.id);
    const user_idx = users.findIndex(user => user.id === id);

    users.splice(user_idx, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status : "success - user deleted"});
    });
});

app.listen(PORT, () => console.log(`server started at port - ${PORT}`));