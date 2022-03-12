const express = require("express");
const router = express.Router();
const CurriculumStudentLevels = require("../models/curriculumStudentLevels");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/curriculumStudentLevels
// @desc    Get All curriculumStudentLevels
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
    const getAllCurriculumStudentLevels = await CurriculumStudentLevels.find(condition);
    res.json(getAllCurriculumStudentLevels);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   POST api/curriculumStudentLevels
// @desc    Add A curriculumStudentLevels
// @access  Private
router.post("/", async (req, res) => {
  const curriculumId = req.body.curriculumId;
  const studentLevelsId = req.body.studentLevelsId;
  const curriculumStudentLevels = {
    curriculumId,
    studentLevelsId,
  };
  if (!isNil(curriculumId && !isNil(studentLevelsId))) {
    try {
      const getCurriculumStudentLevels = await CurriculumStudentLevels.find({
        curriculumId,
        studentLevelsId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCurriculumStudentLevels.length == 0) {
        const newCurriculumStudentLevels = new CurriculumStudentLevels(curriculumStudentLevels);
        const createCurriculumStudentLevels = await newCurriculumStudentLevels.save();
        res.json(createCurriculumStudentLevels);
      } else {
        res.status(500).json("Curriculum Student Levels is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PATCH api/curriculumStudentLevels/:id
// @desc    Update A curriculumStudentLevels
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCurriculumStudentLevels = await CurriculumStudentLevels.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json(updateCurriculumStudentLevels);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Curriculum Student Levels Cannot be found");
  }
});

// @route   DELETE api/curriculumStudentLevels/:id
// @desc    Delete A curriculumStudentLevels
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCurriculumStudentLevels = await CurriculumStudentLevels.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCurriculumStudentLevels.length > 0) {
      const deleteCurriculumStudentLevels = await CurriculumStudentLevels.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json(deleteCurriculumStudentLevels);
    } else {
      res.status(500).json("Curriculum Student Levels is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
