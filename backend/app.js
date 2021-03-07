const express = require("express");
const app = express();

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

//import all routes from
const products = require("./routes/product");

app.use("/api/v1", products);

//make sure to configure middleware after routes
app.use(errorMiddleware);

module.exports = app;
