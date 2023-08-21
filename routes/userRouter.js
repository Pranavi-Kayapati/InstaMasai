const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.send({ msg: "User already exist, please login" });
  } else {
    try {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });

          await user.save();

          res.status(200).send({ message: "New user Registered successfully" });
        }
      });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, user: user.name },
            "instaapp",
            {
              expiresIn: "7d",
            }
          );
          res.send({ message: "Login successful", token: token });
        } else {
          res.send({ error: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ message: "User not exist" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = { userRouter };
