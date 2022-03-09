const express = require("express");
const router = express.Router();
const Semester = require("../models/semester");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/semester
// @desc    Get All Semester
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
    const getAllSemester = await Semester.find(condition);
    res.json({
      dbRes: getAllSemester,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   GET api/semester/:id
// @desc    Get Single Semester
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getSemester = await Semester.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getSemester,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/semester/add
// @desc    Add A Semester
// @access  Private
router.post("/", async (req, res) => {
  const name = req.body.name;
  const isActive = req.body.isActive;
  if (!isNil(name)) {
    const newSemester = new Semester({
      name,
      isActive,
    });
    try {
      const getSemester = await Semester.find({
        name,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSemester.length === 0) {
        const createSemester = await newSemester.save();
        res.json({
          dbRes: createSemester,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Semester is already in use",
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

// @route   PUT api/Semester/:id
// @desc    Update A Semester
// @access  Private
router.put("/:id", async (req, res) => {
  const name = req.body.name;
  const isActive = req.body.isActive;
  if (!isNil(name)) {
    try {
      const getSemester = await Semester.find({
        name,
        isActive,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSemester.length === 0) {
        const updateSemester = await Semester.findByIdAndUpdate(req.params.id, {
          $set: {
            name,
            isActive,
            updatedAt: Date.now()
          },
        });
        res.json({
          dbRes: updateSemester,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Semester name must be unique",
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

// @route   PATCH api/Semester/:id
// @desc    Update A Semester
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateSemester = await Semester.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json({
        dbRes: updateSemester,
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
      dbRes: "Semester Cannot be found",
      isSuccess: false,
    });
  }
});

// @route   DELETE api/Semester/:id
// @desc    Delete A Semester
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getSemester = await Semester.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getSemester.length > 0) {
      const deleteSemester = await Semester.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteSemester,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "Semester is already deleted",
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
