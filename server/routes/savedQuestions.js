const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

// CREATE or refresh a saved question for the current logged-in user
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const userId = req.user.id;

    const {
      questionId,
      questionText,
      topic = "",
      difficulty = "",
      correctAnswer = "",
      source = "favorite",
      isFavorite = false,
      isReviewed = false,
      personalNote = "",
    } = req.body;

    if (!questionId || !questionText || !source) {
      return res.status(400).json({
        message: "questionId, questionText, and source are required",
      });
    }

    const now = new Date();

    const filter = {
      userId,
      questionId,
      source,
    };

    const existing = await collection.findOne(filter);

    if (existing) {
      await collection.updateOne(filter, {
        $set: {
          questionText,
          topic,
          difficulty,
          correctAnswer,
          isFavorite,
          personalNote,
          updatedAt: now,
          savedAt: now,
        },
      });

      return res.status(200).json({
        message: "Saved question refreshed successfully",
        refreshed: true,
      });
    }

    const result = await collection.insertOne({
      userId,
      questionId,
      questionText,
      topic,
      difficulty,
      correctAnswer,
      source,
      isFavorite,
      isReviewed,
      personalNote,
      createdAt: now,
      updatedAt: now,
      savedAt: now,
    });

    return res.status(201).json({
      message: "Saved question created successfully",
      insertedId: result.insertedId,
      refreshed: false,
    });
  } catch (error) {
    console.error("Error creating saved question:", error);
    return res.status(500).json({ message: "Failed to save question" });
  }
});

// READ all saved questions for the current logged-in user
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");

    const savedQuestions = await collection
      .find({ userId: req.user.id })
      .toArray();

    return res.json(savedQuestions);
  } catch (error) {
    console.error("Error fetching saved questions:", error);
    return res.status(500).json({ message: "Failed to fetch saved questions" });
  }
});

// UPDATE reviewed status for the current logged-in user
router.put("/:id/review", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");
    const { id } = req.params;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
        userId: req.user.id,
      },
      {
        $set: {
          isReviewed: true,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Saved question not found" });
    }

    return res.json({ message: "Saved question marked as reviewed" });
  } catch (error) {
    console.error("Error updating saved question:", error);
    return res.status(500).json({ message: "Failed to update saved question" });
  }
});

// DELETE a saved question for the current logged-in user
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("savedQuestions");
    const { id } = req.params;

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Saved question not found" });
    }

    return res.json({ message: "Saved question deleted successfully" });
  } catch (error) {
    console.error("Error deleting saved question:", error);
    return res.status(500).json({ message: "Failed to delete saved question" });
  }
});

module.exports = router;