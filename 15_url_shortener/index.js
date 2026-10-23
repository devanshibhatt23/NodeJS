const express = require("express");

const { connectMongoDB } = require("../14_url_shortener/connection");
const router = require("./routes/url");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/url_shortener")
.then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", router);

app.listen(PORT, () => {
    console.log("Server started at ", PORT);
});