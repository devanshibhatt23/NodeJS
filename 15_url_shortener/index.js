const express = require("express");
const path = require("path");

const { connectMongoDB } = require("../14_url_shortener/connection");
const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const { url } = require("./models/url");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/url_shortener")
.then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", router);
app.use("/", staticRouter);

app.get("/test", async (req,res) => {
    const urls = await url.find({});

    return res.render("home", {
        url: urls,
    });
});

app.listen(PORT, () => {
    console.log("Server started at ", PORT);
});