const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
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
    res.status(404).send({ error: error });
  }
});

userRouter.post("/login", (req, res) => {
  res.send("Lonin Page");
});

module.exports = { userRouter };
