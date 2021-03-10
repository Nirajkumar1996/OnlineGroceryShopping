const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(cookieParser());

//import all routes from
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

//make sure to configure middleware after routes
app.use(errorMiddleware);

module.exports = app;
