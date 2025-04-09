import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config({ path: ".env.development" }); // Load environment variables from .env.development
// const uri = process.env.ATLAS_URI_TEST;  Connection string for MongoDB Atlas
const uri = process.env.ATLAS_URI_TEST_LOCAL; // Connection string for MongoDB Local

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: "Back to the Future" };
    const movie = await movies.findOne(query);

    console.log(movie); // Print the movie document to the console
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
