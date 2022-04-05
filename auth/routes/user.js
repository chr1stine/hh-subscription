const express = require("express");
require("dotenv").config();
const router = express.Router();

const User = require("../models/user");

const crypto = require("crypto");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (user) {
      res.status(200).send({ id: user.id, login: user.login });
    } else {
      res.status(404).send({ message: "not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { login, password } = req.body;

    salt = crypto.randomBytes(16).toString("hex");
    hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    User.create({ login, password: hash, salt })
      .then((userDoc) => {
        res.status(201).send({
          message: "successfully registered",
          user: { id: userDoc.id, login: userDoc.login },
        });
      })
      .catch((err) => {
        res.status(409).send({
          message: "bad request",
          error: "login has to be unique and yours already occupied",
        });
      });
  } catch (error) {
    res.status(500).send({ message: "server error", error });
  }
});

module.exports = router;
