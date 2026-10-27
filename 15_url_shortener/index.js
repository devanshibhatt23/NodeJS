const express = require("express");
const path = require("path");

const { connectMongoDB } = require("../15_url_shortener/connection");

const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const cookieParser = require("cookie-parser");

const { url } = require("./models/url");

const app = express();
const PORT = 8000;

app.use(cookieParser());

const { restrictToLoggedInUsers, checkAuth } = require("./middlewares/auth");

connectMongoDB("mongodb://127.0.0.1:27017/url_shortener")
.then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", restrictToLoggedInUsers, router);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.get("/test", async (req,res) => {
    const urls = await url.find({});

    return res.render("home", {
        url: urls,
    });
});

app.listen(PORT, () => {
    console.log("Server started at ", PORT);
});