const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const DEMO_USER = {
  id: "demo-user-1",
  username: "demo",
  password: "easypass123",
  name: "Demo User",
};

passport.use(
  new LocalStrategy((username, password, done) => {
    if (
      username === DEMO_USER.username &&
      password === DEMO_USER.password
    ) {
      return done(null, {
        id: DEMO_USER.id,
        username: DEMO_USER.username,
        name: DEMO_USER.name,
      });
    }

    return done(null, false, { message: "Invalid username or password" });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === DEMO_USER.id) {
    return done(null, {
      id: DEMO_USER.id,
      username: DEMO_USER.username,
      name: DEMO_USER.name,
    });
  }

  return done(null, false);
});

module.exports = passport;