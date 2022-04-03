const express = require("express");
const router = express.Router();
require("dotenv").config();

// where to pass id of the resource in DELETE

// where to pass credentials in POST

// creates new session aka loggin in
router.post("/", (req, res) => {
  // extracting data from request object

  // identification

  // authentication

  const token = "123";
  res.status(200).send({ access_token: "token" });
  res.status(401).send("error: unauthorized");
});

// deletes current session aka loggin out
router.delete("/:id", (req, res) => {
  const { id } = req.url;
  res.status(201).send("successfully logged out");
  //  res.status(401).send('error: unauthorized');
});

module.exports = router;
