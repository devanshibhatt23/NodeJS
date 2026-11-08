const { getUser } = require("../service/auth");

async function restrictToLoggedInUsers(req, res, next) {
    const userUid = req.cookies?.token;

    if(!userUid) {
        return res.redirect("/login");
    }

    try {
        const user = getUser(userUid);

        if(!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch(error) {
        return res.redirect("/login");
    }
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.token;

    try {
        const user = getUser(userUid);
        req.user = user;
    } catch(error) {
        req.user = null;
    }

    next();
}

module.exports = {
    restrictToLoggedInUsers,
    checkAuth,
};