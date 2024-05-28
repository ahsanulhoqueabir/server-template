const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const port = process.env.port || 5000;
const dotenv = require("dotenv");
dotenv.config();
const jwtRoute = require("./route/middleware.js");
const busRoute = require("./route/bus.js");
const employeRoute = require("./route/employe.js");
const stoppageRoute = require("./route/stoppage.js");
const Routes = require("./route/busRoute.js");
const app = express();
const corsOptions = { origin: true, Credential: true };

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my server");
});

const dburi = process.env.MONGODB_URI;

const connection = async () => {
  try {
    await mongoose.connect(dburi);
    console.log("connected");
  } catch (err) {
    console.log("Error: ", err);
  }
};
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1", router);
app.use("/api/v1/verify", jwtRoute);
app.use("/api/v1/bus", busRoute);
app.use("/api/v1/employe", employeRoute);
app.use("/api/v1/stoppage", stoppageRoute);
app.use("/api/v1/busRoute", Routes);

app.listen(port, () => {
  connection();
  console.log(`Server is running at ${port}`);
});
module.exports.handler = serverless(app);
