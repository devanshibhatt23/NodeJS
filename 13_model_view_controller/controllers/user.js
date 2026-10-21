const { User } = require("../models/user");

async function getAllUsers(req,res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function createUser(req,res) {
    const body = req.body;
    console.log(body);

    const res_user = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
    });

    console.log(res_user);
    return res.status(201).json({msg : "success", id: res_user._id});
}

async function getUser(req,res) {
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function updateUser(req,res) {
    await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'});
    return res.json({status: "success"});
}

async function deleteUser(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
}