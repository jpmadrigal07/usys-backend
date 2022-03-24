const express = require("express");
const router = express.Router();
const UserType = require("../models/userType");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/userType
// @desc    Get All UserType
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
    const getAllUserType = await UserType.find(condition);
    res.json(getAllUserType);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/userType/:id
// @desc    Get Single UserType
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUserType = await UserType.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getUserType,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/userType/add
// @desc    Add A UserType
// @access  Private
router.post("/", async (req, res) => {
  const type = req.body.type;
  const privileges = req.body.privileges;
  const userType = {
    type,
    privileges,
  };
  if (!isNil(type) && !isNil(privileges)) {
    try {
      const getUserType = await UserType.find({
        type,
        privileges,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserType.length == 0) {
        const newUserType = new UserType(userType);
        const createUserType = await newUserType.save();
        res.json(createUserType);
      } else {
        res.status(500).json("UserType id must be unique");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/userType/:id
// @desc    Update A UserType
// @access  Private
router.put("/:id", async (req, res) => {
  const type = req.body.type;
  const privileges = req.body.privileges;
  const userType = {
    type,
    privileges,
  };
  if (!isNil(type) && !isNil(privileges)) {
    try {
      const getUserType = await UserType.find({
        type,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserType.length === 0) {
        const updateUserType = await UserType.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              type,
              privileges,
              updatedAt: Date.now(),
            },
          }
        );
        res.json({
          dbRes: updateUserType,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "UserType id must be unique",
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

// @route   PATCH api/userType/:id
// @desc    Update A UserType
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateUserType = await UserType.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json(updateUserType);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("UserType Cannot be found");
  }
});

// @route   DELETE api/UserType/:id
// @desc    Delete A UserType
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getUserType = await UserType.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getUserType.length > 0) {
      const deleteUserType = await UserType.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteUserType,
        isSuccess: true,
      });
      res.json(deleteUserType);
    } else {
      res.status(500).json("UserType is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
