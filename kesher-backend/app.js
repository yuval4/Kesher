var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const loginController = require("./controllers/LoginController");
const childrenController = require("./controllers/ChildrenController");
const schoolsController = require("./controllers/SchoolsController");
const reportsController = require("./controllers/ReportsController");
const usersController = require("./controllers/UsersController");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(loginController);
app.use("/uploads", express.static("uploads"));
app.use("/children", childrenController);
app.use("/schools", schoolsController);
app.use("/reports", reportsController);
app.use("/users", usersController);

app.all("*", (req, res, next) => {
    res.sendStatus(404);
});

module.exports = app;
