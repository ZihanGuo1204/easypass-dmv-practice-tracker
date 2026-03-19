const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const savedQuestionsRoutes = require("./routes/savedQuestions");
const questionsRoutes = require("./routes/questions");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/saved-questions", savedQuestionsRoutes);
app.use("/api/questions", questionsRoutes);

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