const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in .env file");
}

let client;
let database;

async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      database = client.db(process.env.DB_NAME || "easypass");
      console.log("✅ MongoDB connected");
    }
    return database;
  } catch (error) {
    throw error;
  }
}

module.exports = { connectDB, getClient: () => client };
