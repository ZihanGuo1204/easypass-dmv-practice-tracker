const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

// GET all saved questions
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const questions = await collection.find().toArray();

    res.json(questions);
  } catch (error) {
    console.error("Error fetching saved questions:", error);
    res.status(500).json({ message: "Failed to fetch saved questions" });
  }
});

// POST create new saved question
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const newQuestion = req.body;

    const result = await collection.insertOne(newQuestion);

    res.status(201).json({
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating saved question:", error);
    res.status(500).json({ message: "Failed to create saved question" });
  }
});

// DELETE a saved question
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const { ObjectId } = require("mongodb");

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting saved question:", error);
    res.status(500).json({ message: "Failed to delete saved question" });
  }
});

// PUT mark as reviewed
router.put("/:id/review", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const { ObjectId } = require("mongodb");

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { isReviewed: true } }
    );

    res.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Failed to update question" });
  }
});

module.exports = router;
