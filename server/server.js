const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB, getClient } = require("./config/db");
const savedQuestionsRoutes = require("./routes/savedQuestions");
const questionsRoutes = require("./routes/questions");
const attemptsRoutes = require("./routes/attempts");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/saved-questions", savedQuestionsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/attempts", attemptsRoutes);

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

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await getClient().close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
