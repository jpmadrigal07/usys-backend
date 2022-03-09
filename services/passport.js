const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const Student = require("../models/student");
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    if(user) {
      Student.findOne({userId: id}).then(student => {
        if(student) {
          const token = jwt.sign({ userId: user._id, email: user.email, userType: user.userType }, keys.sessionKey, { expiresIn: "30m" });
          try {
            const tokenInfo = jwt.verify(token, keys.sessionKey);
            const tokenizedUser = {
              _id: user._id,
              email: user.email,
              userType: user.userType
            } 
            // add other info
            done(null, {
              res: {user: tokenizedUser, otherInfo: student, token, tokenExpiry: tokenInfo.exp},
              isSuccess: true
            });
          } catch(err) {
            done(null, {
              res: err.message,
              isSuccess: false
            });
          }
        } else {
          done(null, {
            res: "Student not found",
            isSuccess: false
          });
        }
      });
    } else {
      done(null, {
        res: "User not found",
        isSuccess: false
      });
    }
  });
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      proxy: true,
    },
    async (username, password, done) => {
      const existingUser = await User.findOne({
        email: username,
        password: password,
      });
      if (existingUser) {
        return done(null, existingUser);
      } else {
        return done(null, false);
      }
    }
  )
);