const express = require("express");
const userWrapUpRouter = express.Router();
const jwt = require("jsonwebtoken");
const {UserWrapUpModel} = require("../../Model/Wrap-up/user.wrapup.model");
const bcrypt = require("bcrypt");

//register the user
userWrapUpRouter.post("/register", async (req, res) => {
  try {
    const { email, password, } = req.body;

    // check if user with the email already exists
    const existingUser = await UserWrapUpModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      // create a new user
      const user = new UserWrapUpModel({
       ...req.body,
        password: hash,
       
       
      });
      await user.save();

      // return success message
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
});

//login users
userWrapUpRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserWrapUpModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, firstname: user.firstname },
            "wrapup"
          );

       
          res.status(200)
            .json({
              message: "Login Sucessful",
              token,
              userId: user._id,
              user
            });
        } else {
          res.status(401).json({ message: "Wrong Credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "Email not Registered" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//get all the users
userWrapUpRouter.get("/", async (req, res) => {
   
    try {
    const users = await UserWrapUpModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

userWrapUpRouter.patch("/edit/:id", async (req, res) => {
   const{id}=req.params
  try {
  const users = await UserWrapUpModel.findByIdAndUpdate({_id:id},req.body);
  res.status(200).json(users);
} catch (error) {
  res.status(500).json({ error });
}
});

userWrapUpRouter.delete("/delete/:id", async (req, res) => {
  const{id}=req.params
 try {
 const users = await UserWrapUpModel.findByIdAndDelete({_id:id});
 res.status(200).json(users);
} catch (error) {
 res.status(500).json({ error });
}
});




module.exports = { userWrapUpRouter };