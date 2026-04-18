const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const connectDB = require("../config/db");
const { ensureAuthenticated } = require("../middleware/auth");

// CREATE a new attempt for the current logged-in user
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");

    const newAttempt = {
      userId: req.user.id,
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

// READ all attempts for the current logged-in user
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");

    const attempts = await collection
      .find({ userId: req.user.id })
      .sort({ answeredAt: -1 })
      .toArray();

    res.json(attempts);
  } catch (error) {
    console.error("Error fetching attempts:", error);
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
});

// UPDATE an attempt belonging to the current logged-in user
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");
    const { id } = req.params;

    const updateFields = {
      ...(req.body.questionId !== undefined && {
        questionId: req.body.questionId,
      }),
      ...(req.body.questionText !== undefined && {
        questionText: req.body.questionText,
      }),
      ...(req.body.selectedAnswer !== undefined && {
        selectedAnswer: req.body.selectedAnswer,
      }),
      ...(req.body.correctAnswer !== undefined && {
        correctAnswer: req.body.correctAnswer,
      }),
      ...(req.body.isCorrect !== undefined && {
        isCorrect: req.body.isCorrect,
      }),
      ...(req.body.topic !== undefined && { topic: req.body.topic }),
      ...(req.body.difficulty !== undefined && {
        difficulty: req.body.difficulty,
      }),
    };

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
        userId: req.user.id,
      },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json({ message: "Attempt updated successfully" });
  } catch (error) {
    console.error("Error updating attempt:", error);
    res.status(500).json({ message: "Failed to update attempt" });
  }
});

// DELETE an attempt belonging to the current logged-in user
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("attempts");
    const { id } = req.params;

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    res.json({ message: "Attempt deleted successfully" });
  } catch (error) {
    console.error("Error deleting attempt:", error);
    res.status(500).json({ message: "Failed to delete attempt" });
  }
});

module.exports = router;