// require express
const express = require('express');

/// require all controllers 
const { getAllSellers, createNewSellers, getInfoForSellers } = require('../controllers/Sellers');

// define Router
const SellersRouter = express.Router();

// Routes

//  [get]  [http://localhost:5000/users]
SellersRouter.get("/", getAllSellers);

//  [post]  [http://localhost:5000/newDoctors]
SellersRouter.post("/newsellers", createNewSellers);

//  [get]  [http://localhost:5000/users/sellers/:id]
SellersRouter.get("/sellers/:id", getInfoForSellers);





module.exports = SellersRouter;