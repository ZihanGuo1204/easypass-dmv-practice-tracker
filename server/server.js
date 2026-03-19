const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const savedQuestionsRoutes = require("./routes/savedQuestions");
const questionsRoutes = require("./routes/questions");
const attemptsRoutes = require("./routes/attempts");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/saved-questions", savedQuestionsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/attempts", attemptsRoutes);

// test route
app.get("/", (req, res) => {
  res.send("EasyPass API running");
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer();