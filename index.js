const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// middlewire for data parsing and cors
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// mongodb connection 
const uri = "mongodb://0.0.0.0:27017/";
// "mongodb+srv://user:password@cluster0.1ranzbu.mongodb.net/?retryWrites=true&w=majority";

/*  Mongodb atlas connection*/
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

/*  Mongodb compass connection*/
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const dbname = client.db("dbname");
    const collectionName = allInformation.collection("collectionName");

   
   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
