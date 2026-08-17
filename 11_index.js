const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req,res) => {
    const html = `
    <ul>
        ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    </ul>
    `;

    return res.send(html);
});

app.get("/api/users", (req,res) => {
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