const express = require("express");
const router = express.Router();
const passport = require("passport");
const _ = require("lodash");
const keys = require("../config/keys");
const Student = require("../models/student");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

router.get("/auth/local/callback", (req, res) => {
  res.send(req.user);
});

router.get("/auth/local/failure", (req, res) => {
  res.send(false);
});

router.post(
  "/auth/local",
  passport.authenticate("local-login", {
    successRedirect: "/auth/local/callback",
    failureRedirect: "/auth/local/failure",
  })
);

//login router
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user with that email");
    }
    const isValid = (await password) === user.password;
    if (!isValid) {
      throw new Error("Incorrect password");
    }
    // return jwt
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      keys.cookieKey,
      { expiresIn: "1d" }
    );
    const student = await User.findOne({ _id: user.id });
    res.json({
      token,
      user,
      name: student ? student.name : "",
    });
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

//login verify
router.post("/verify", async (req, res) => {
  const token = req.body.token;
  try {
    // Check if token is defined
    if (!token) {
      throw new Error("Token is invalid");
    }
    // Verify the token
    const { email, exp } = jwt.verify(token, keys.cookieKey);
    // Check if email exist in db
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user with that email");
    }
    // Check if token is not expired
    const elapsedTimeInSeconds = Math.floor(parseInt(exp) - Date.now() / 1000);
    const elapsedSeconds = elapsedTimeInSeconds % 60;
    if (Math.sign(elapsedSeconds) === -1) {
      throw new Error("Token is expired");
    }
    // Return isVerified true if all 3 condition passed
    res.json("User authentication is verified");
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    if (message === "jwt malformed") {
      res.status(500).json("Token is invalid");
    } else {
      res.status(500).json(message);
    }
  }
});

// router.post("/auth/local/verify", (req, res) => {
//   const token = req.body.token;
//   if(token) {
//     const tokenInfo = jwt.verify(token, keys.sessionKey);
//     if(tokenInfo) {
//       Student.findOne({userId: tokenInfo.userId}).then(student => {
//         const tokenizedUser = {
//           _id: tokenInfo.userId,
//           email: tokenInfo.email,
//           userType: tokenInfo.userType
//         }
//         res.json({
//           res: { user: tokenizedUser, otherInfo: student },
//           isSuccess: true
//         });
//       });
//     } else {
//       res.json({
//         res: "There is a problem verifying the token",
//         isSuccess: false
//       });
//     }
//   } else {
//     res.json({
//       res: "There is a problem on the token",
//       isSuccess: false
//     });
//   }
// });

// router.get("/api/logout", (req, res) => {
// req.logout();
//   res.redirect("/");
// });

module.exports = router;
