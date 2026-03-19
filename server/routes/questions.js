const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

// GET question metadata (topics + difficulties)
router.get("/meta", async (req, res) => {
  try {
    const db = await connectDB();
    const questions = db.collection("questions");

    const topics = await questions.distinct("topic");
    const difficulties = await questions.distinct("difficulty");

    res.json({
      topics: topics.filter(Boolean).sort(),
      difficulties: difficulties.filter(Boolean).sort(),
    });
  } catch (error) {
    console.error("Error fetching question metadata:", error);
    res.status(500).json({ message: "Failed to fetch question metadata" });
  }
});

// GET random question
router.get("/random", async (req, res) => {
  try {
    const db = await connectDB();
    const questions = db.collection("questions");

    const randomQuestion = await questions
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomQuestion.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.json(randomQuestion[0]);
  } catch (error) {
    console.error("Error fetching random question:", error);
    res.status(500).json({ message: "Failed to fetch random question" });
  }
});

// GET filtered / paginated / searched question list
router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const questions = db.collection("questions");

    const {
      topic = "",
      difficulty = "",
      q = "",
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (topic) {
      filter.topic = topic;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (q) {
      filter.questionText = { $regex: q, $options: "i" };
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await questions.countDocuments(filter);

    const items = await questions.find(filter).skip(skip).limit(limitNum).toArray();

    res.json({
      items,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.max(1, Math.ceil(total / limitNum)),
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

module.exports = router;