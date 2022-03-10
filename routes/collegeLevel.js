const express = require("express");
const router = express.Router();
const CollegeLevel = require("../models/collegeLevel");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/collegeLevel
// @desc    Get All collegeLevel
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
      const getAllCollegeLevel = await CollegeLevel.find(condition);
      res.json({
        dbRes: getAllCollegeLevel,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  });

// @route   POST api/collegeLevel/add
// @desc    Add A collegeLevel
// @access  Private
router.post("/", async (req, res) => {
    const type = req.body.type;
    if (!isNil(type) ) { 
      const newCollegeLevel = new CollegeLevel({
        type
    
      });
      try {
        const getCollegeLevel = await CollegeLevel.find({
            type,
          deletedAt: {
            $exists: false,
          },
        });
        if (getCollegeLevel.length === 0) {
          const createCollegeLevel = await newCollegeLevel.save();
          res.json({
            dbRes: createCollegeLevel,
            isSuccess: true,
          });
        } else {
          res.json({
            dbRes: "College Level is already in use",
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

// @route   PATCH api/CollegeLevel/:id
// @desc    Update A CollegeLevel
// @access  Private
router.patch("/:id", async (req, res) => {
    const condition = req.body;
    if (!isEmpty(condition)) {
      try {
        const updateCollegeLevel = await CollegeLevel.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateCollegeLevel,
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
        dbRes: "College Level Cannot be found",
        isSuccess: false,
      });
    }
  });

// @route   DELETE api/CollegeLevel/:id
// @desc    Delete A CollegeLevel
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
      const getCollegeLevel = await CollegeLevel.find({
        _id: req.params.id,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCollegeLevel.length > 0) {
        const deleteCollegeLevel = await CollegeLevel.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
        res.json({
          dbRes: deleteCollegeLevel,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "College Level is already deleted",
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