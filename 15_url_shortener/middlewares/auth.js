const { setUser, getUser } = require("../service/auth");

async function restrictToLoggedInUsers(req,res,next) {
    const userUid = req.cookies?.uuid;

    if(!userUid) {
        return res.redirect("/login");
    }

    const User = getUser(userUid);
    
    if(!User) {
        return res.redirect("/login");
    }

    req.user = User;
    next();
};

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uuid;
    const User = getUser(userUid);

    req.user = User;
    next();
}

module.exports = {
    restrictToLoggedInUsers,
    checkAuth,
};