const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;
require("dotenv").config();
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ahsanulhoqueabir.netlify.app",
      //add your domain here for production use
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion, Db, ObjectId } = require("mongodb");

// mongodb compass connection
// const uri = "mongodb://0.0.0.0:27017/";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASWORD}@cluster0.1ranzbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

/*  Mongodb atlas connection*/
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/*  Mongodb compass connection*/
// const client = new MongoClient(uri);

async function run() {
  try {
    const dbName = client.db("dbName");
    const users = dbName.collection("users");
    const collection1 = dbName.collection("collection1");

    // --------------- Custom Middleware -----------------
    const verifyJWT = (req, res, next) => {
      const authorized = req.headers.authorization;
      if (!authorized) {
        return res
          .status(401)
          .json({ error: true, message: "Authentication Error" });
      }
      const token = authorized.split(" ")[1];
      jwt.verify(
        token,
        // process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res
              .status(403)
              .json({ error: true, message: "Token is not valid" });
          }
          req.decoded = decoded;
          next();
        }
      );
    };

    // use verifyJWT before calling this
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await users.findOne({ email: email });

      if (user.role === "admin") {
        next();
      } else {
        res.status(403).json({ error: true, message: "Unauthorized  User" });
      }
    };

    app.post("/jwt", (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
      });
      res.send({ token });
    });
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
