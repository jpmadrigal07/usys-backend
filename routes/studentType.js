const express = require("express");
const router = express.Router();
const StudentType = require("../models/studentType");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/studentType
// @desc    Get All studentType
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
    const getAllStudentType = await StudentType.find(condition);
    res.json({
      dbRes: getAllStudentType,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/studentType/add
// @desc    Add A studentType
// @access  Private
router.post("/", async (req, res) => {
  const type = req.body.type;
  if (!isNil(type)) {
    const newStudentType = new StudentType({
      type,
    });
    try {
      const getStudentType = await StudentType.find({
        type,
        deletedAt: {
          $exists: false,
        },
      });
      if (getStudentType.length === 0) {
        const createStudentType = await newStudentType.save();
        res.json({
          dbRes: createStudentType,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Student Type is already in use",
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

// @route   PATCH api/StudentType/:id
// @desc    Update A StudentType
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateStudentType = await StudentType.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json({
        dbRes: updateStudentType,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  } else {
    res.json({
      dbRes: "Student Type Cannot be found",
      isSuccess: false,
    });
  }
});

// @route   DELETE api/StudentType/:id
// @desc    Delete A StudentType
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getStudentType = await StudentType.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getStudentType.length > 0) {
      const deleteStudentType = await StudentType.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json({
        dbRes: deleteStudentType,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "Student Type is already deleted",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

module.exports = router;
