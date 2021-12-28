const express = require("express");
const loginBuyer = require("../../controllers/AuthBuyer/login");

// define router
const loginbuyerRouter = express.Router();

//routes
//[post]  [http://localhost:5000/loginbuyer]
loginbuyerRouter.post("/", loginBuyer);

module.exports = loginbuyerRouter;