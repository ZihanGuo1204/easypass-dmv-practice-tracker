const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connectDB = require("./db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const db = await connectDB();
      const usersCollection = db.collection("users");

      const user = await usersCollection.findOne({ username });

      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Invalid username or password" });
      }

      return done(null, {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, {
      id: user._id.toString(),
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
