const express = require("express");
const router = express.Router();
const SatelliteCampus = require("../models/satelliteCampus");
const isNil = require("lodash/isNil");
1;
const isEmpty = require("lodash/isEmpty");

// @route   GET api/user
// @desc    Get All SatelliteCampus
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
    const getAllSatelliteCampus = await SatelliteCampus.find(condition);
    res.json(getAllSatelliteCampus);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/SatelliteCampus/:id
// @desc    Get Single SatelliteCampus
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getSatelliteCampus = await SatelliteCampus.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getSatelliteCampus,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/SatelliteCampus/add
// @desc    Add A SatelliteCampus
// @access  Private
router.post("/", async (req, res) => {
  const campusName = req.body.campusName;
  const mainCampusId = req.body.mainCampusId;
  const schoolName = req.body.schoolName;
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const currency = req.body.currency;
  const currencySymbol = req.body.currencySymbol;
  const city = req.body.city;
  const state = req.body.state;
  const address = req.body.address;
  if (
    !isNil(campusName) &&
    !isNil(mainCampusId) &&
    !isNil(schoolName) &&
    !isNil(email) &&
    !isNil(mobileNumber) &&
    !isNil(currency) &&
    !isNil(currencySymbol) &&
    !isNil(city) &&
    !isNil(state) &&
    !isNil(address)
  ) {
    const newSatelliteCampus = new SatelliteCampus({
      campusName,
      mainCampusId,
      schoolName,
      email,
      mobileNumber,
      currency,
      currencySymbol,
      city,
      state,
      address,
      createdAt,
      updatedAt,
      deletedAt,
    });
    try {
      const getSatelliteCampus = await SatelliteCampus.find({
        campusName,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSatelliteCampus.length === 0) {
        const createSatelliteCampus = await newSatelliteCampus.save();
        res.json(createSatelliteCampus);
      } else {
        res.status(500).json("Campus name must be unique");
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/SatelliteCampus/:id
// @desc    Update A SatelliteCampus
// @access  Private
router.put("/:id", async (req, res) => {
  const campusName = req.body.campusName;
  const mainCampusId = req.body.mainCampusId;
  const schoolName = req.body.schoolName;
  const email = req.body.email;
  const mobileNumber = req.body.mobileNumber;
  const currency = req.body.currency;
  const currencySymbol = req.body.currencySymbol;
  const city = req.body.city;
  const state = req.body.state;
  const address = req.body.address;
  if (
    !isNil(campusName) &&
    !isNil(mainCampusId) &&
    !isNil(schoolName) &&
    !isNil(email) &&
    !isNil(mobileNumber) &&
    !isNil(currency) &&
    !isNil(currencySymbol) &&
    !isNil(city) &&
    !isNil(state) &&
    !isNil(address)
  ) {
    try {
      const getSatelliteCampus = await SatelliteCampus.find({
        campusName,
        deletedAt: {
          $exists: false,
        },
      });
      if (getSatelliteCampus.length === 0) {
        const updateSatelliteCampus = await SatelliteCampus.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              campusName,
              mainCampusId,
              schoolName,
              email,
              mobileNumber,
              currency,
              currencySymbol,
              city,
              state,
              address,
              createdAt,
              updatedAt: Date.now,
              deletedAt,
            },
          }
        );
        res.json({
          dbRes: updateSatelliteCampus,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Campus name must be unique",
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

// @route   PATCH api/SatelliteCampus/:id
// @desc    Update A SatelliteCampus
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateSatelliteCampus = await SatelliteCampus.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json(updateSatelliteCampus);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Course Cannot be found");
  }
});

// @route   DELETE api/SatelliteCampus/:id
// @desc    Delete A SatelliteCampus
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getSatelliteCampus = await SatelliteCampus.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getSatelliteCampus.length > 0) {
      const deleteSatelliteCampus = await SatelliteCampus.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json(deleteSatelliteCampus);
    } else {
      res.status(500).json("Campus is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
