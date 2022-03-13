const express = require("express");
const router = express.Router();
const CurriculumSemesterSubjects = require("../models/curriculumSemesterSubjects");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/curriculumSemesterSubjects
// @desc    Get All curriculumSemesterSubjects
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
    const getAllCurriculumSemesterSubjects = await CurriculumSemesterSubjects.find(condition);
    res.json(getAllCurriculumSemesterSubjects);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   POST api/CurriculumSemesterSubjects
// @desc    Add A CurriculumSemesterSubjects
// @access  Private
router.post("/", async (req, res) => {
  const curriculumId = req.body.curriculumId;
  const semesterId = req.body.semesterId;
  const curriculumSemesterSubjects = {
    curriculumId,
    semesterId,
  };
  if (!isNil(curriculumId) && !isNil(semesterId)) {
    try {
      const getCurriculumSemesterSubjects = await CurriculumSemesterSubjects.find({
        curriculumId,
        semesterId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCurriculumSemesterSubjects.length == 0) {
        const newCurriculumSemesterSubjects = new CurriculumSemesterSubjects(curriculumSemesterSubjects);
        const createCurriculumSemesterSubjects = await newCurriculumSemesterSubjects.save();
        res.json(createCurriculumSemesterSubjects);
      } else {
        res.status(500).json("Curriculum Semester Subjects is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PATCH api/CurriculumSemesterSubjects/:id
// @desc    Update A CurriculumSemesterSubjects
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCurriculumSemesterSubjects = await CurriculumSemesterSubjects.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json(updateCurriculumSemesterSubjects);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Curriculum Semester Subjects Cannot be found");
  }
});

// @route   DELETE api/CurriculumSemesterSubjects/:id
// @desc    Delete A CurriculumSemesterSubjects
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCurriculumSemesterSubjects = await CurriculumSemesterSubjects.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCurriculumSemesterSubjects.length > 0) {
      const deleteCurriculumSemesterSubjects = await CurriculumSemesterSubjects.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json(deleteCurriculumSemesterSubjects);
    } else {
      res.status(500).json("Curriculum Semester Subjects is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;