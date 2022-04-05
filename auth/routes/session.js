const express = require("express");
const router = express.Router();
require("dotenv").config();

const User = require("../models/user");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ where: { login } });
  if (!user) {
    res
      .status(401)
      .send({ message: "identification error", error: "no such user" });
  }

  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  if (user.password != hash) {
    res
      .status(401)
      .send({ message: "authentication error", error: "incorrect password" });
    return;
  }

  const head = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "jwt" })
  ).toString("base64");
  const body = Buffer.from(
    JSON.stringify({ id: user.id, login: user.login })
  ).toString("base64");
  const signature = crypto
    .createHmac("SHA256", process.env.SECRET_KEY)
    .update(`${head}.${body}`)
    .digest("base64");
  const access_token = `${head}.${body}.${signature}`;
  res.status(200).send({ message: "successfully logged in", access_token });
});

function authentication(req, res, next) {
  try {
    const tokenParts = req.headers.authorization.split(" ")[1].split(".");
    let signature = crypto
      .createHmac("SHA256", process.env.SECRET_KEY)
      .update(`${tokenParts[0]}.${tokenParts[1]}`)
      .digest("base64");

    if (signature === tokenParts[2]) {
      req.user_id = JSON.parse(
        Buffer.from(tokenParts[1], "base64").toString("utf8")
      ).id;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "error: unauthorized" });
  }
}

router.delete("/:id", authentication, (req, res) => {
  const { id } = req.url;
  console.log("id is ", id);
  console.log("kinda loggin out..........");
  // User.destroy({where:{id}}).then(()=>{
  //   res.status(201).send("successfully logged out");
  // })
  //  res.status(401).send('error: unauthorized');
  res.status(200).send({ message: "kinda logged out" });
});

module.exports = router;
