const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");
const connectDB = require("../config/db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({
        message: "Name, username, and password are required",
      });
    }

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: result.insertedId.toString(),
        name,
        username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Failed to register user",
    });
  }
});

// LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed",
      });
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      return res.json({
        message: "Login successful",
        user,
      });
    });
  })(req, res, next);
});

// LOGOUT
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.clearCookie("connect.sid");
      return res.json({ message: "Logout successful" });
    });
  });
});

// CURRENT USER
router.get("/me", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }

  return res.status(401).json({
    authenticated: false,
    message: "Not logged in",
  });
});

module.exports = router;
