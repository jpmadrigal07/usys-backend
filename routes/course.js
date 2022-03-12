const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/user
// @desc    Get All Course
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
    const getAllCourse = await Course.find(condition);
    res.json(getAllCourse);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/Course/:id
// @desc    Get Single Course
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getCourse = await Course.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getCourse,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/Course/add
// @desc    Add A Course
// @access  Private
router.post("/", async (req, res) => {
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  if (!isNil(courseName) && !isNil(courseCode)) {
    const newCourse = new Course({
      courseName,
      courseCode,
    });
    try {
      const getCourse = await Course.find({
        courseName,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCourse.length === 0) {
        const createCourse = await newCourse.save();
        res.json(createCourse);
      } else {
        res.json(res.status(500).json("Course is already in use"));
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/Course/:id
// @desc    Update A Course
// @access  Private
router.put("/:id", async (req, res) => {
  const courseName = req.body.courseName;
  const courseCode = req.body.courseCode;
  if (!isNil(courseName) && !isNil(courseCode)) {
    try {
      const getCourse = await Course.find({
        courseName,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCourse.length === 0) {
        const updateCourse = await Course.findByIdAndUpdate(req.params.id, {
          $set: {
            courseName,
            courseCode,
            createdAt,
            updatedAt: Date.now(),
            deletedAt,
          },
        });
        res.json({
          dbRes: updateCourse,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Course name must be unique",
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

// @route   PATCH api/Course/:id
// @desc    Update A Course
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCourse = await Course.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json(updateCourse);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Course cannot be found");
  }
});

// @route   DELETE api/Course/:id
// @desc    Delete A Course
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCourse = await Course.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCourse.length > 0) {
      const deleteCourse = await Course.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json(deleteCourse);
    } else {
      res.status(500).json("Course is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMssage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
