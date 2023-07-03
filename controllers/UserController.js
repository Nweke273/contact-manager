const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ username, email, password: hashedPassword });
  console.log(user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter your username and password");
  }

  const user = await User.findOne({ email });
  if (!user || (await !bcrypt.compare(user.password, password))) {
    res.status(400);
    throw new Error("Incorrect login credentials");
  }

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json(accessToken);
});

const profile = asyncHandler(async (req, res) => {
  console.log("My profile");
});

module.exports = { register, login, profile };
