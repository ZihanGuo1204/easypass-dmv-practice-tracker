const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
require("dotenv").config();

const connectDB = require("./config/db");
const passport = require("./config/passport");

const savedQuestionsRoutes = require("./routes/savedQuestions");
const questionsRoutes = require("./routes/questions");
const attemptsRoutes = require("./routes/attempts");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "easypass-session-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "easypass",
      collectionName: "sessions",
      ttl: 60 * 60 * 24,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
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
