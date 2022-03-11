const express = require("express");
const router = express.Router();
const Cashier = require("../models/cashier");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/cashier
// @desc    Get All Cashier
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
    const getAllCashier = await Cashier.find(condition);
    res.json(getAllCashier);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/cashier/:id
// @desc    Get Single Cashier
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getCashier = await Cashier.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getCashier,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/cashier/add
// @desc    Add A Cashier
// @access  Private
router.post("/", async (req, res) => {
  const payment = req.body.payment;
  const cashTendered = req.body.cashTendered;
  const change = req.body.change;
  const studentId = req.body.studentId;
  const note = req.body.note;

  if (
    !isNil(payment) &&
    !isNil(cashTendered) &&
    !isNil(change) &&
    !isNil(studentId) &&
    !isNil(note)
  ) {
    const newCashier = new Cashier({
      payment,
      cashTendered,
      change,
      studentId,
      note,
    });
    try {
      const getCashier = await Cashier.find({
        payment,
        cashTendered,
        change,
        studentId,
        note,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCashier.length === 0) {
        const createCashier = await newCashier.save();
        res.json(createCashier);
      } else {
        res.json(res.status(500).json("Cashier is already in use"));
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Required values are either invalid or empty");
  }
});

// @route   PUT api/Cashier/:id
// @desc    Update A Cashier
// @access  Private
router.put("/:id", async (req, res) => {
  const payment = req.body.payment;
  const cashTendered = req.body.cashTendered;
  const change = req.body.change;
  const studentId = req.body.studentId;
  const note = req.body.note;

  if (
    !isNil(payment) &&
    !isNil(cashTendered) &&
    !isNil(change) &&
    !isNil(studentId) &&
    !isNil(note)
  ) {
    try {
      const getCashier = await Cashier.find({
        payment,
        cashTendered,
        change,
        studentId,
        note,
        deletedAt: {
          $exists: false,
        },
      });
      if (getCashier.length === 0) {
        const updateCashier = await Cashier.findByIdAndUpdate(req.params.id, {
          $set: {
            payment,
            cashTendered,
            change,
            studentId,
            note,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateCashier,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Cashier name must be unique",
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

// @route   PATCH api/Cashier/:id
// @desc    Update A Cashier
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateCashier = await Cashier.findByIdAndUpdate(req.params.id, {
        $set: condition,
        updatedAt: Date.now(),
      });
      res.json(updateCashier);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("Cashier cannot be found");
  }
});

// @route   DELETE api/Cashier/:id
// @desc    Delete A Cashier
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getCashier = await Cashier.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getCashier.length > 0) {
      const deleteCashier = await Cashier.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json(deleteCashier);
    } else {
      res.status(500).json("Cashier is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMssage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
