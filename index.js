const express = require("express");
const app = express();
const mongoose=require("mongoose")
const { connection } = require("./Connection/connection");

const { auth } = require("./MiddleWare/logintrendify.middleware");
const {auths} =require("./MiddleWare/login.wrapup.middleware")
const {userWrapUpRouter}=require("./Routes/Wrap-up/user.wrapup.route")
const {TodoWrapUpRouter} =require("./Routes/Wrap-up/project.wrapup.route")
const { productTrendifyRouter } = require("./Routes/producttrendify.route");
const cors = require("cors");
require("dotenv").config();

const { userTrendifyRouter } = require("./Routes/usertrendify.route");
const { cartTrendifyRouter } = require("./Routes/carttrendify.route");
const { wishlistRouter } = require("./Routes/wishlist.route");

app.use(cors());
mongoose.set('strictQuery', false);
app.use(express.json());

app.use("/trendify/products", productTrendifyRouter);

app.use("/trendify/users", userTrendifyRouter);

app.use("/trendify/cart", auth, cartTrendifyRouter);

app.use("/trendify/wishlist", auth, wishlistRouter);


/**
 * wrap-up routes
 * 
 */

app.use("/wrapup/users",userWrapUpRouter );
app.use("/wrapup/todos",auths,TodoWrapUpRouter)




app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (err) {
    console.log("cannot connect to the db");
  }
  console.log("Port 8080 is running");
});
