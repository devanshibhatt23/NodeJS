const { v4: uuidv4 } = require("uuid");
const user = require("../models/user");

const { setUser, getUser } = require("../service/auth");

async function signupUser(req,res) {
    const { name, email, password } = req.body;

    await user.create({
        name: name,
        email: email,
        password: password,
    });

    return res.redirect("/");
}

async function loginUser(req,res) {
    const { email, password } = req.body;

    const User = await user.findOne({ email, password });

    if(!User) return res.render("login", {
        error: "Invalid username or password",
    });

    console.log("User successfully logged in:", User);

    const sessionId = uuidv4();
    setUser(sessionId,User);

    res.cookie("uuid", sessionId);
    
    return res.redirect("/");
}

module.exports = {
    signupUser,
    loginUser,
};