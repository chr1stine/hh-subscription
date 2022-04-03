const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../db");
const User = require("../models/user");
const crypto = require("crypto");

// need mysql db and sequelize
// also need something to hash password with

router.post("/", (req, res) => {
  try {
    const { body } = req;
    const { login, password } = body;

    salt = crypto.randomBytes(16).toString("hex");
    // Hashing user's salt and password with 1000 iterations,
    hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    User.create({ login, password: hash });
    // check if exists / try add as if unique
    // 409 conflict  in case of false result of checking or exceptin
    // 201 in case of success
    res
      .status(409)
      .send("error: login has to be unique and yours already occupied");
    res.status(201).send("successfully registered");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
