const express = require("express");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");
const passport = require("./config/passport");

const savedQuestionsRoutes = require("./routes/savedQuestions");
const questionsRoutes = require("./routes/questions");
const attemptsRoutes = require("./routes/attempts");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "easypass-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/saved-questions", savedQuestionsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/attempts", attemptsRoutes);

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