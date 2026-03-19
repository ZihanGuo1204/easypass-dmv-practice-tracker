const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

// CREATE a new attempt
router.post("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");

    const newAttempt = {
      userId: req.body.userId || "demo-user-1",
      questionId: req.body.questionId,
      questionText: req.body.questionText,
      selectedAnswer: req.body.selectedAnswer,
      correctAnswer: req.body.correctAnswer,
      isCorrect: req.body.isCorrect,
      topic: req.body.topic || "",
      difficulty: req.body.difficulty || "",
      answeredAt: new Date(),
    };

    const result = await collection.insertOne(newAttempt);

    res.status(201).json({
      insertedId: result.insertedId,
      message: "Attempt saved successfully",
    });
  } catch (error) {
    console.error("Error saving attempt:", error);
    res.status(500).json({ message: "Failed to save attempt" });
  }
});

// READ all attempts
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");

    const attempts = await collection.find().sort({ answeredAt: -1 }).toArray();

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
});

module.exports = router;
