const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const port = process.env.port || 5000;
const dotenv = require("dotenv");
dotenv.config();
const jwtRoute = require("../route/middleware.js");
const busRoute = require("../route/bus.js");
const employeRoute = require("../route/employe.js");
const stoppageRoute = require("../route/stoppage.js");
const Routes = require("../route/busRoute.js");

const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to My Server");
});

const dburi = process.env.MONGODB_URI;
mongoose
  .connect(dburi)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
app.use(express.json());
app.use(cors(corsOptions));

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
});
app.use("/.netlify/functions/api/v1", router);
app.use("/.netlify/functions/api/v1/verify", jwtRoute);
app.use("/.netlify/functions/api/v1/bus", busRoute);
app.use("/.netlify/functions/api/v1/employe", employeRoute);
app.use("/.netlify/functions/api/v1/stoppage", stoppageRoute);
app.use("/.netlify/functions/api/v1/busRoute", Routes);

module.exports.handler = serverless(app);
