const express = require("express");
const loginSeller = require("../../controllers/AuthSeller/login");

// define router
const loginSellerRouter = express.Router();

//routes
//[post]  [http://localhost:5000/loginSeller/]

loginSellerRouter.post("/", loginSeller);

module.exports = loginSellerRouter;