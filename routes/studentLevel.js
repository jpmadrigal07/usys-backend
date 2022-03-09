const express = require("express");
const router = express.Router();
const StudentLevel = require("../models/studentLevel");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/studentLevel
// @desc    Get All studentLevel
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
      const getAllStudentLevel = await StudentLevel.find(condition);
      res.json({
        dbRes: getAllStudentLevel,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  });

// @route   POST api/studentLevel/add
// @desc    Add A studentLevel
// @access  Private
router.post("/", async (req, res) => {
    const type = req.body.type;
    const level = req.body.level;
    if (!isNil(type) && !isNil(level)) {
      const newStudentLevel = new StudentLevel({
        type,
        level
      });
      try {
        const getStudentLevel = await StudentLevel.find({
            type,
            level,
          deletedAt: {
            $exists: false,
          },
        });
        if (getStudentLevel.length === 0) {
          const createStudentLevel = await newStudentLevel.save();
          res.json({
            dbRes: createStudentLevel,
            isSuccess: true,
          });
        } else {
          res.json({
            dbRes: "Student Level is already in use",
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

// @route   PATCH api/StudentLevel/:id
// @desc    Update A StudentLevel
// @access  Private
router.patch("/:id", async (req, res) => {
    const condition = req.body;
    if (!isEmpty(condition)) {
      try {
        const updateStudentLevel = await StudentLevel.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateStudentLevel,
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
        dbRes: "Student Level Cannot be found",
        isSuccess: false,
      });
    }
  });

// @route   DELETE api/StudentLevel/:id
// @desc    Delete A StudentLevel
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
      const getStudentLevel = await StudentLevel.find({
        _id: req.params.id,
        deletedAt: {
          $exists: false,
        },
      });
      if (getStudentLevel.length > 0) {
        const deleteStudentLevel = await StudentLevel.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
        res.json({
          dbRes: deleteStudentLevel,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Student Level is already deleted",
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