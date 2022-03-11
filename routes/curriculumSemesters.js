const express = require("express");
const router = express.Router();
const CurriculumSemesters = require("../models/curriculumSemesters");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/curriculumSemesters
// @desc    Get All CurriculumSemesters
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
    const getAllCurriculumSemesters = await CurriculumSemesters.find(condition);
    res.json(getAllCurriculumSemesters);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   POST api/curriculumSemesters/add
// @desc    Add A CurriculumSemesters
// @access  Private
router.post("/", async (req, res) => {
  const curriculumId = req.body.curriculumId;
  const semestersId = req.body.semestersId;
  if (!isNil(curriculumId) && !isNil(semestersId)) {
    const newCurriculumSemesters = new CurriculumSemesters({
      curriculumId,
      semestersId,
    });
    try {
      const getCurriculumSemesters = await CurriculumSemesters.find({
        curriculumId,
        semestersId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCurriculumSemesters.length === 0) {
        const createCurriculumSemesters = await newCurriculumSemesters.save();
        res.json(createCurriculumSemesters);
      } else {
        res.status(500).json("Curriculum Semester is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PATCH api/curriculumSemesters/:id
// @desc    Update A CurriculumSemesters
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCurriculumSemesters =
        await CurriculumSemesters.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
      res.json(updateCurriculumSemesters);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Curriculum Semesters Cannot be found");
  }
});

// @route   DELETE api/curriculumSemesters/:id
// @desc    Delete A CurriculumSemesters
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCurriculumSemesters = await CurriculumSemesters.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCurriculumSemesters.length > 0) {
      const deleteCurriculumSemesters =
        await CurriculumSemesters.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
      res.json(deleteCurriculumSemesters);
    } else {
      res.status(500).json("Curriculum Semesters is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
