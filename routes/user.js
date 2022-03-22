const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/user
// @desc    Get All User
// @access  Public
router.get("/", async (req, res) => {
  const condition = !isNil(req.query.condition)
    ? JSON.parse(req.query.condition)
    : {};
  if (isNil(condition.deletedAt)) {
    condition.deletedAt = {
      $exists: false,
    };
  }
  try {
    const getAllUser = await User.find(condition);
    res.json(getAllUser);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/areaPrice/:id
// @desc    Get Single User
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUser = await User.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getUser,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/areaPrice/add
// @desc    Add A User
// @access  Private
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  if (!isNil(email) && !isNil(password) && !isNil(userType)) {
    const newUser = new User({
      email,
      password,
      userType,
    });
    try {
      const getUser = await User.find({
        email,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUser.length === 0) {
        const createUser = await newUser.save();
        res.json(createUser);
      } else {
        res.status(500).json("User is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/areaPrice/:id
// @desc    Update A User
// @access  Private
router.put("/:id", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  if (!isNil(email) && !isNil(password) && !isNil(userType)) {
    try {
      const getUser = await User.find({
        email,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUser.length === 0) {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          $set: {
            email,
            password,
            userType,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateUser,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Email must be unique",
          isSuccess: false,
        });
      }
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty",
      isSuccess: false,
    });
  }
});

// @route   PATCH api/areaPrice/:id
// @desc    Update A User
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json(updateUser);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("User Cannot be found");
  }
});

// @route   DELETE api/areaPrice/:id
// @desc    Delete A User
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getUser = await User.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getUser.length > 0) {
      const deleteUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json(deleteUser);
    } else {
      res.status(500).json("User is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
