require("dotenv").config();
var cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const sessionRouter = require("./routes/session");
app.use("/session", sessionRouter);

app.listen(`${process.env.AUTH_PORT}`, () =>
  console.log(`server started on port ${process.env.AUTH_PORT}`)
);
