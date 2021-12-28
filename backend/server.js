const cors = require("cors");
// require express
const express = require("express");
// require database 

const db = require("./db/db");
// instantiate express
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());


app.use(express.urlencoded({ extended: true }));



// import Routers
const userRouter = require("./routers/routes/Users");
const SellersRouter = require("./routers/routes/Sellers")
const signupBuyerRouter = require("./routers/routes/AuthBuyer/signup");
const loginbuyerRouter = require("./routers/routes/AuthBuyer/login");
const signupSellerRouter = require("./routers/routes/AuthSeller/signup");
const loginSellerRouter = require("./routers/routes/AuthSeller/login");
const appointmentsRouter = require("./routers/routes/appointments")
const searchRouter = require("./routers/routes/search");


//app Routers
app.use("/users", userRouter);
app.use("/Seller", SellersRouter);
app.use("/signupbuyer", signupBuyerRouter);
app.use("/loginbuyer", loginbuyerRouter);
app.use("/signupSeller", signupSellerRouter);
app.use("/loginSeller", loginSellerRouter);
app.use("/appointments", appointmentsRouter)
app.use("/search", searchRouter)
    // run the server locally on the desired port, use the following link to open up the server http://localhost:3000`
app.listen(port, () => {
    // will log to the command line when the server starts
    console.log(`your app listening at http://localhost:${port}`);
});