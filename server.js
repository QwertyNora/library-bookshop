const express = require("express");
const cors = require("cors");
const userRouter = require("./app/routes/users");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use imported router for all user requests
app.use(userRouter);

app.listen(3000, () => console.log("Listening on port:3000"));
