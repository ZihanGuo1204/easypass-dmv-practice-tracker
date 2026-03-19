const connectDB = require("../config/db");
const { ObjectId } = require("mongodb");

async function getCollection() {
  const db = await connectDB();
  return db.collection("savedQuestions");
}

// CREATE
async function createSavedQuestion(data) {
  const collection = await getCollection();
  return await collection.insertOne(data);
}

// READ ALL
async function getAllSavedQuestions(userId) {
  const collection = await getCollection();

  if (userId) {
    return await collection.find({ userId }).toArray();
  }

  return await collection.find({}).toArray();
}

// UPDATE
async function updateSavedQuestion(id, updateData) {
  const collection = await getCollection();
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
}

// DELETE
async function deleteSavedQuestion(id) {
  const collection = await getCollection();
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  createSavedQuestion,
  getAllSavedQuestions,
  updateSavedQuestion,
  deleteSavedQuestion,
};
