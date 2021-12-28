const express = require("express");
const { searchForSellerByTitle } = require("../controllers/search");

const searchRouter = express.Router();

searchRouter.get('/', searchForSellerByTitle);



module.exports = searchRouter;