const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// schema
const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

mongoose.connect("mongodb://127.0.0.1:27017/testapp1").then(() => console.log("MongoDB connected")).catch(err => console.log("Error", err));

const User = mongoose.model('user', user_schema)

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

app.get("/users", async (req,res) => {
    const allDBUsers = await User.find({});

    const html = `
    <ul>
        ${allDBUsers.map((users) => `<li>${users.first_name} : ${users.email}</li>`).join("")}
    </ul>
    `;

    return res.send(html);
});

app.get("/api/users", async (req,res) => {
    // console.log(req.headers);

    const allDBUsers = await User.find({});

    // custom header (add X to custom header)
    // res.setHeader("X-new-header", "xyz");
    return res.json(allDBUsers);
});

app.post("/api/users", async (req,res) => {
    const body = req.body;
    console.log(body);
    
    // users.push({...body, id : users.length+1}); 

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    //     return res.json({status : "success - new user created with id:", id: users.length});
    // });

    const res_user = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
    });

    console.log(res_user);

    return res.status(201).json({msg : "success"});
});

app.route("/api/users/:id")
.get(async (req,res) => {
    // const id = Number(req.params.id);

    // const user = users.find(user => user.id === id);

    const user = await User.findById(req.params.id);

    return res.json(user);
})
.patch(async (req,res) => {
    // const id = Number(req.params.id);
    // const body = req.body;
    // const user_idx = users.findIndex(user => user.id === id);

    // users[user_idx] = {...users[user_idx], ...body};

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    //     return res.json({status : "success - user edited with id:", id: users.length});
    // });

    await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});

    return res.json({status: "success"});
})
.delete(async (req,res) => {
    // const id = Number(req.params.id);
    // const user_idx = users.findIndex(user => user.id === id);

    // users.splice(user_idx, 1);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
    //     return res.json({status : "success - user deleted"});
    // });

    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
});

app.listen(PORT, () => console.log(`server started at port - ${PORT}`));