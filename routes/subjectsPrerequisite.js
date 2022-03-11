const express = require("express");
const router = express.Router();
const SubjectPrerequisite = require("../models/subjectPrerequisite");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/SubjectPrerequisite
// @desc    Get All SubjectPrerequisite
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
    const getAllSubjectPrerequisite = await SubjectPrerequisite.find(condition);
    res.json({
      dbRes: getAllSubjectPrerequisite,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/SubjectPrerequisite/add
// @desc    Add A SubjectPrerequisite
// @access  Private
router.post("/", async (req, res) => {
  const subjectId = req.body.subjectId;
  const requiredSubjectId = req.body.requiredSubjectId;
  if (!isNil(subjectId) && !isNil(requiredSubjectId)) {
    const newSubjectPrerequisite = new SubjectPrerequisite({
      subjectId,
      requiredSubjectId,
    });
    try {
      const getSubjectPrerequisite = await SubjectPrerequisite.find({
        subjectId,
        requiredSubjectId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSubjectPrerequisite.length === 0) {
        const createSubjectPrerequisite = await newSubjectPrerequisite.save();
        res.json({
          dbRes: createSubjectPrerequisite,
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

// @route   PATCH api/SubjectPrerequisite/:id
// @desc    Update A SubjectPrerequisite
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateSubjectPrerequisite =
        await SubjectPrerequisite.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
      res.json({
        dbRes: updateSubjectPrerequisite,
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
      dbRes: "SubjectPrerequisite Cannot be found",
      isSuccess: false,
    });
  }
});

// @route   DELETE api/SubjectPrerequisite/:id
// @desc    Delete A SubjectPrerequisite
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getSubjectPrerequisite = await SubjectPrerequisite.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getSubjectPrerequisite.length > 0) {
      const deleteSubjectPrerequisite =
        await SubjectPrerequisite.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
      res.json({
        dbRes: deleteSubjectPrerequisite,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "SubjectPrerequisite is already deleted",
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
