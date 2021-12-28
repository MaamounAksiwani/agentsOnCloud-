const express = require("express");
const registerSeller = require("../../controllers/AuthSeller/signup");

// define router
const signupSellerRouter = express.Router();

//routes
//post  [http://localhost:5000/signupSeller]

signupSellerRouter.post("/", registerSeller);

module.exports = signupSellerRouter;