const express = require("express");
const router = express.Router();
const CurriculumStudentType = require("../models/curriculumStudentType");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/CurriculumStudentType
// @desc    Get All CurriculumStudentType
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
    const getAllCurriculumStudentType = await CurriculumStudentType.find(
      condition
    );
    res.json(getAllCurriculumStudentType);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   POST api/CurriculumStudentType/add
// @desc    Add A CurriculumStudentType
// @access  Private
router.post("/", async (req, res) => {
  const curriculumId = req.body.curriculumId;
  const studentTypeId = req.body.studentTypeId;
  if (!isNil(curriculumId) && !isNil(studentTypeId)) {
    const newCurriculumStudentType = new CurriculumStudentType({
      curriculumId,
      studentTypeId,
    });
    try {
      const getCurriculumStudentType = await CurriculumStudentType.find({
        curriculumId,
        studentTypeId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCurriculumStudentType.length == 0) {
        const createCurriculumStudentType =
          await newCurriculumStudentType.save();
        res.json(createCurriculumStudentType);
      } else {
        res.status(500).json("CurriculumStudentType is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PATCH api/CurriculumStudentType/:id
// @desc    Update A CurriculumStudentType
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCurriculumStudentType =
        await CurriculumStudentType.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
      res.json(updateCurriculumStudentType);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("CurriculumStudentType Cannot be found");
  }
});

// @route   DELETE api/CurriculumStudentType/:id
// @desc    Delete A CurriculumStudentType
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCurriculumStudentType = await CurriculumStudentType.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCurriculumStudentType.length > 0) {
      const deleteCurriculumStudentType =
        await CurriculumStudentType.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
      res.json(deleteCurriculumStudentType);
    } else {
      res.json("CurriculumStudentType is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
