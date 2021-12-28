const express = require("express");
const registerBuyer = require("../../controllers/AuthBuyer/signup");

// define router
const signupBuyerRouter = express.Router();

//routes
//[post]  [http://localhost:5000/signupbuyer]
signupBuyerRouter.post("/", registerBuyer);

module.exports = signupBuyerRouter;