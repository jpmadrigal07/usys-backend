const express = require("express");
const router = express.Router();
const UserLevel = require("../models/userLevel");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/userLevel
// @desc    Get All UserLevel
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
    const getAllUserLevel = await UserLevel.find(condition);
    res.json(getAllUserLevel);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/userLevel/:id
// @desc    Get Single UserLevel
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUserLevel = await UserLevel.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getUserLevel,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/userLevel/add
// @desc    Add A UserLevel
// @access  Private
router.post("/", async (req, res) => {
  const level = req.body.level;
  const privileges = req.body.privileges;
  const userLevel = {
    level,
    privileges,
  };
  if (!isNil(level) && !isNil(privileges)) {
    try {
      const getUserLevel = await UserLevel.find({
        level,
        privileges,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserLevel.length == 0) {
        const newUserLevel = new UserLevel(userLevel);
        const createUserLevel = await newUserLevel.save();
        res.json(createUserLevel);
      } else {
        res.status(500).json("UserLevel id must be unique");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/userLevel/:id
// @desc    Update A UserLevel
// @access  Private
router.put("/:id", async (req, res) => {
  const level = req.body.level;
  const privileges = req.body.privileges;
  const userLevel = {
    level,
    privileges,
  };
  if (!isNil(level) && !isNil(privileges)) {
    try {
      const getUserLevel = await UserLevel.find({
        level,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserLevel.length === 0) {
        const updateUserLevel = await UserLevel.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              level,
              privileges,
              updatedAt: Date.now(),
            },
          }
        );
        res.json({
          dbRes: updateUserLevel,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "UserLevel id must be unique",
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

// @route   PATCH api/userLevel/:id
// @desc    Update A UserLevel
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateUserLevel = await UserLevel.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json(updateUserLevel);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("User Level Cannot be found");
  }
});

// @route   DELETE api/UserLevel/:id
// @desc    Delete A UserLevel
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getUserLevel = await UserLevel.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getUserLevel.length > 0) {
      const deleteUserLevel = await UserLevel.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteUserLevel,
        isSuccess: true,
      });
      res.json(deletePrivilege);
    } else {
      res.status(500).json("User Level is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
