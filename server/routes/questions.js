const express = require("express");
const router = express.Router();
const connectDB = require("../config/db");

router.get("/random", async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("questions");

    const randomQuestion = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

    if (!randomQuestion.length) {
      return res.status(404).json({ message: "No questions found." });
    }

    res.json(randomQuestion[0]);
  } catch (error) {
    console.error("Error fetching random question:", error);
    res.status(500).json({ message: "Failed to fetch random question." });
  }
});

module.exports = router;