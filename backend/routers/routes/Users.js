// require express
const express = require('express');

/// require all controllers 
const { getAllUsers, createUser } = require('../controllers/Users');

// define Router
const userRouter = express.Router();

// Routes

//  [get]  [http://localhost:5000/users]
userRouter.get("/", getAllUsers);


//  [post]  [http://localhost:5000/create]
userRouter.post("/create", createUser);



module.exports = userRouter;