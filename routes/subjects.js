const express = require("express");
const router = express.Router();
const Subjects = require("../models/subjects");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/subjects
// @desc    Get All subjects
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
      const getAllSubjects = await Subjects.find(condition);
      res.json({
        dbRes: getAllSubjects,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  });

// @route   POST api/subjects/add
// @desc    Add A subjects
// @access  Private
router.post("/", async (req, res) => {
    const courseNumber = req.body.courseNumber;
    const description = req.body.description;
    if (!isNil(courseNumber) && !isNil(description)) {
      const newSubjects = new Subjects({
        courseNumber,
        description
      });
      try {
        const getSubjects = await Subjects.find({
            courseNumber,
            description,
          deletedAt: {
            $exists: false,
          },
        });
        if (getSubjects.length === 0) {
          const createSubjects = await newSubjects.save();
          res.json({
            dbRes: createSubjects,
            isSuccess: true,
          });
        } else {
          res.json({
            dbRes: "Subject is already in use",
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

// @route   PATCH api/Subjects/:id
// @desc    Update A Subjects
// @access  Private
router.patch("/:id", async (req, res) => {
    const condition = req.body;
    if (!isEmpty(condition)) {
      try {
        const updateSubjects = await Subjects.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateSubjects,
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
        dbRes: "Subjects Cannot be found",
        isSuccess: false,
      });
    }
  });

// @route   DELETE api/Subjects/:id
// @desc    Delete A Subjects
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
      const getSubjects = await Subjects.find({
        _id: req.params.id,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSubjects.length > 0) {
        const deleteSubjects = await Subjects.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
        res.json({
          dbRes: deleteSubjects,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Subjects is already deleted",
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