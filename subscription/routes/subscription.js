const express = require("express");
const router = express.Router();
require("dotenv").config();

// const jwt = require("jsonwebtoken");

const Subscription = require("../models/subscription");
const crypto = require("crypto");

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

router.use(authentication);

router.get("/", async (req, res) => {
  const { user_id } = req;
  // read subscription with given user_ud from mongodb
  if (user_id) {
    try {
      const [subscriptionDoc, created] = await Subscription.findOrCreate({
        where: { user_id },
        defaults: {
          subscriptionOn: false,
        },
      });

      res.status(200).send({ subscription: subscriptionDoc });
    } catch (err) {
      console.log(err);
      res.status(404).send({ message: "no such user" });
    }
  } else {
    res.status(401).send({ message: "error: unauthorized" });
  }
});

router.put("/", async (req, res) => {
  const { user_id } = req;
  const newSubscription = req.body.subscription;
  Subscription.findOrCreate({ where: { user_id } })
    .then(([oldSubscription, created]) => {
      oldSubscription
        .update({ ...newSubscription })
        .then(() => {
          res
            .status(201)
            .send({ message: "subscription successfully modified" });
        })
        .catch((error) => {
          res
            .status(500)
            .send({ message: "couldn't modify a subscription", error });
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "couldn't find nor create a subscription", error });
    });
});

module.exports = router;
