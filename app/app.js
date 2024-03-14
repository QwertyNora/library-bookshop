const express = require("express");
const cors = require("cors");

const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5500",
  })
);

app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/books", bookRouter);
//TODO: add routes here

module.exports = app;
