const express = require("express");
const router = express.Router();
const Privilege = require("../models/privilege");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");


// @route   GET api/privilege
// @desc    Get All Privilege
// @access  Public
router.get("/", async (req, res) => {
    const condition = !isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
    if (isNil(condition.deletedAt)) {
        condition.deletedAt = {
            $exists: false
        }
    }
    try {
      const getAllPrivilege = await Privilege.find(condition);
      res.json({
        dbRes: getAllPrivilege,
        isSuccess: true
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false
      });
    }
  });

// @route   GET api/Privilege/:id
// @desc    Get Single Privilege
// @access  Public
router.get("/:id", async (req, res) => {
    try {
      const getPrivilege = await Privilege.findById({
        _id: req.params.id,
        deletedAt: {
          $exists: false
        }
      });
      res.json({
        dbRes: getPrivilege,
        isSuccess: true
      });
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false
      });
    }
  });

// @route   POST api/Privilege/add
// @desc    Add A Privilege
// @access  Private
router.post("/", async (req, res) => {
    const desc = req.body.desc;
    if (!isNil(desc)) {
      const newPrivilege = new Privilege({
        desc,
      });
      try {
        const getPrivilege = await Privilege.find({
          desc,
          deletedAt: {
            $exists: false
          }
        });
        if (getPrivilege.length === 0) {
            const createPrivilege = await newPrivilege.save();
            res.json({
              dbRes: createPrivilege,
              isSuccess: true
            });
          } else {
            res.json({
              dbRes: "Privilege is already in use",
              isSuccess: false
            });
          }
        } catch (error) {
          res.json({
            dbRes: error.message,
            isSuccess: false
          });
        }
      } else {
        res.json({
          dbRes: "Required values are either invalid or empty",
          isSuccess: false
        });
      }
    });

// @route   PUT api/Privilege/:id
// @desc    Update A Privilege
// @access  Private
router.put("/:id", async (req, res) => {
    const desc = req.body.desc;
  if (!isNil(desc)) {
    try {
      const getPrivilege = await Privilege.find({
        desc,
        deletedAt: {
          $exists: false
        }
      });
      if (getPrivilege.length === 0) {
        const updatePrivilege = await Privilege.findByIdAndUpdate(req.params.id, {
          $set: {
            desc,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updatePrivilege,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Privilege name must be unique",
          isSuccess: false
        });
      }
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty",
      isSuccess: false
    });
  }
});

// @route   PATCH api/Privilege/:id
// @desc    Update A Privilege
// @access  Private
router.patch("/:id", async (req, res) => {
    const condition = req.body;
    if (!isEmpty(condition)) {
      try {
          const updatePrivilege = await Privilege.findByIdAndUpdate(req.params.id, {
            $set: condition,
            updatedAt: Date.now(),
          });
          res.json({
            dbRes: updatePrivilege,
            isSuccess: true
          });
      } catch (error) {
        res.json({
          dbRes: error.message,
          isSuccess: false
        });
      }
    } else {
      res.json({
        dbRes: "Privilege Cannot be found",
        isSuccess: false
      });
    }
  });

// @route   DELETE api/Privilege/:id
// @desc    Delete A Privilege
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
      const getPrivilege = await Privilege.find({
        _id: req.params.id,
        deletedAt: {
          $exists: false
        }
      });
      if (getPrivilege.length > 0) {
        const deletePrivilege = await Privilege.findByIdAndUpdate(req.params.id, {
          $set: {
            deletedAt: Date.now(),
          },
        });
        res.json({
          dbRes: deletePrivilege,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Privilege is already deleted",
          isSuccess: false
        });
      }
    } catch (error) {
      res.json({
        dbRes: error.message,
        isSuccess: false
      });
    }
  });
  
  module.exports = router;