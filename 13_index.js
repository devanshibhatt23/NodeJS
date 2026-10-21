const express = require("express");

const userRouter = require("./13_model_view_controller/routes/user");
const { connectMongoDB } = require("./13_model_view_controller/connection");
const { logRequestResponse } = require("./13_model_view_controller/middlewares");

const app = express();
const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/testapp1").then(() => console.log("MongoDB connected"));

app.use(express.urlencoded({ extended: false }));
app.use(logRequestResponse("./log.txt"));

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started at port - ${PORT}`));