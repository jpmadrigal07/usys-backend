const express = require("express");
const router = express.Router();
const UserPrivileges = require("../models/userPrivileges");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");

// @route   GET api/userPrivileges
// @desc    Get All UserPrivileges
// @access  Public
router.get("/", async (req, res) => {
  const condition = !isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  if (isNil(condition.deletedAt)) {
    condition.deletedAt = {
      $exists: false
    }
  }
  try {
    const getAllUserPrivileges = await UserPrivileges.find(condition);
    res.json({
      dbRes: getAllUserPrivileges,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false
    });
  }
});

// @route   GET api/UserPrivileges/:id
// @desc    Get Single UserPrivileges
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUserPrivileges = await UserPrivileges.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    res.json({
      dbRes: getUserPrivileges,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false
    });
  }
});

// @route   POST api/UserPrivileges/add
// @desc    Add A UserPrivileges
// @access  Private
router.post("/", async (req, res) => {
  const userId = req.body.userId;
  const privilege = req.body.privilege;
  const isDefault = req.body.isDefault;
  const userPrivileges = {
    userId,
    privilege,
    isDefault
  };
  if (!isNil(userId) && !isNil(privilege)) {
    try {
      const getUserPrivileges = await UserPrivileges.find({
        userId,
        privilege,
        isDefault,
        deletedAt: {
          $exists: false
        }
      });
      if (getUserPrivileges.length == 0) {
        const newUserPrivileges = new UserPrivileges(userPrivileges);
        const createUserPrivileges = await newUserPrivileges.save();
        res.json({
          dbRes: createUserPrivileges,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "User and privilege id must be unique",
          isSuccess: false//
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

// @route   PUT api/UserPrivileges/:id
// @desc    Update A UserPrivileges
// @access  Private
router.put("/:id", async (req, res) => {
  const userId = req.body.userId;
  const privilege = req.body.privilege;
  const isDefault = req.body.isDefault;
  const userPrivileges = {
    userId,
    privilege,
    isDefault
  };
  if (!isNil(userId) && !isNil(privilege)) {
    try {
      const getUserPrivileges = await UserPrivileges.find({
        userId,
        privilege,
        isDefault,
        deletedAt: {
          $exists: false
        }
      });
      if (getUserPrivileges.length === 0) {
        const updateUserPrivileges = await UserPrivileges.findByIdAndUpdate(req.params.id, {
          $set: {
            userId,
            privilege,
            isDefault,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateUserPrivileges,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "User and privilege id must be unique",
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

// @route   PATCH api/UserPrivileges/:id
// @desc    Update A UserPrivileges
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
        const updateUserPrivileges = await UserPrivileges.findByIdAndUpdate(req.params.id, {
          $set: condition,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateUserPrivileges,
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
      dbRes: "User Privileges cannot be found",
      isSuccess: false
    });
  }
});

// @route   DELETE api/UserPrivileges/:id
// @desc    Delete A UserPrivileges
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getUserPrivileges = await UserPrivileges.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    if (getUserPrivileges.length > 0) {
      const deleteUserPrivileges = await UserPrivileges.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteUserPrivileges,
        isSuccess: true
      });
    } else {
      res.json({
        dbRes: "User Privilege is already deleted",
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