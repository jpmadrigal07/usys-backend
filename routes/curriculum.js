const express = require("express");
const router = express.Router();
const Curriculum = require("../models/curriculum");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/curriculum
// @desc    Get All Curriculum
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
    const getAllCurriculum = await Curriculum.find(condition);
    res.json(getAllCurriculum);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   POST api/curriculum
// @desc    Add A Curriculum
// @access  Private
router.post("/", async (req, res) => {
  const courseId = req.body.courseId;
  const curriculum = {
    courseId,
  };
  if (!isNil(courseId)) {
    try {
      const getCurriculum = await Curriculum.find({
        courseId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCurriculum.length == 0) {
        const newCurriculum = new Curriculum(curriculum);
        const createCurriculum = await newCurriculum.save();
        res.json(createCurriculum);
      } else {
        res.status(500).json("Curriculum is already in use");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PATCH api/curriculum/:id
// @desc    Update A Curriculum
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCurriculum = await Curriculum.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json(updateCurriculum);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Curriculum Cannot be found");
  }
});

// @route   DELETE api/Curriculum/:id
// @desc    Delete A Curriculum
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCurriculum = await Curriculum.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCurriculum.length > 0) {
      const deleteCurriculum = await Curriculum.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json(deleteCurriculum);
    } else {
      res.status(500).json("Curriculum is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOW_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
