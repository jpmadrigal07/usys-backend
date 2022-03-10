const express = require("express");
const router = express.Router();
const ShsLevel = require("../models/shsLevel");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/Shslevel
// @desc    Get All ShsLevel
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
      const getAllShsLevel = await ShsLevel.find(condition);
      res.json({
        dbRes: getAllShsLevel,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false,
      });
    }
  });

// @route   POST api/shsLevel/add
// @desc    Add A ShsLevel
// @access  Private
router.post("/", async (req, res) => {
    const type = req.body.type;
    if (!isNil(type) ) { 
      const newShsLevel = new ShsLevel({
        type
    
      });
      try {
        const getShsLevel = await ShsLevel.find({
            type,
          deletedAt: {
            $exists: false,
          },
        });
        if (getShsLevel.length === 0) {
          const createShsLevel = await newShsLevel.save();
          res.json({
            dbRes: createShsLevel,
            isSuccess: true,
          });
        } else {
          res.json({
            dbRes: "Senior High Level is already in use",
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

// @route   PATCH api/ShsLevel/:id
// @desc    Update A ShsLevel
// @access  Private
router.patch("/:id", async (req, res) => {
    const condition = req.body;
    if (!isEmpty(condition)) {
      try {
        const updateShsLevel = await ShsLevel.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateShsLevel,
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
        dbRes: "Senior High Level Cannot be found",
        isSuccess: false,
      });
    }
  });

// @route   DELETE api/ShsLevel/:id
// @desc    Delete A ShsLevel
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
      const getShsLevel = await ShsLevel.find({
        _id: req.params.id,
        deletedAt: {
          $exists: false,
        },
      });
      if (getShsLevel.length > 0) {
        const deleteShsLevel = await ShsLevel.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
        res.json({
          dbRes: deleteShsLevel,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Senior High Level is already deleted",
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