const express = require("express");
const router = express.Router();
const UserDocument = require("../models/userDocument");
const isNil = require("lodash/isNil");
const isEmpty = require("lodash/isEmpty");
const multer = require("multer");
const path = require("path");
const helpers = require("./helpers");

// @route   GET api/user
// @desc    Get All UserDocument
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
    const getAllUserDocument = await UserDocument.find(condition);
    res.json(getAllUserDocument);
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

// @route   GET api/UserDocument/:id
// @desc    Get Single UserDocument
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUserDocument = await UserDocument.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getUserDocument,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: error.message,
      isSuccess: false,
    });
  }
});

// @route   POST api/UserDocument/add
// @desc    Add A UserDocument
// @access  Private
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage, fileFilter: helpers.imageFilter });

router.post("/", upload.single("requiredFile"), async (req, res) => {
  const documentId = req.body.documentId;
  const userId = req.body.userId;
  const documentPath = `uploads/${req.file.filename}`;
  if (req.file && userId && documentId) {
    try {
      const getUserDocument = await UserDocument.find({
        documentId,
        userId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserDocument.length === 0) {
        const newUserDocument = new UserDocument({
          documentId,
          documentPath,
          userId,
        });
        const createUserDocument = await newUserDocument.save();
        if (createUserDocument) {
          res.json({
            dbRes: { document: createUserDocument },
            isSuccess: true,
          });
        } else {
          res.status(500).json("Document upload failed");
        }
      } else {
        const updateUserDocument = await UserDocument.findOneAndUpdate(
          { documentId, userId },
          {
            $set: {
              documentPath,
              updatedAt: Date.now(),
            },
          },
          { returnOriginal: false }
        );
        if (updateUserDocument) {
          res.json({
            dbRes: { document: updateUserDocument },
            isSuccess: true,
          });
        } else {
          res.status(500).json("Required values are either invalid or empty");
        }
      }
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    return res.send("Please select an image to upload");
  }
});

// @route   PUT api/UserDocument/:id
// @desc    Update A UserDocument
// @access  Private
router.put("/:id", async (req, res) => {
  const documentId = req.body.documentId;
  const filePath = req.body.filePath;
  const userId = req.body.userId;
  if (!isNil(documentId) && !isNil(filePath) && !isNil(userId)) {
    try {
      const getUserDocument = await UserDocument.find({
        documentId,
        filePath,
        userId,
        deletedAt: {
          $exists: false,
        },
      });
      if (getUserDocument.length === 0) {
        const updateUserDocument = await UserDocument.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              documentId,
              filePath,
              userId,
              updatedAt: Date.now(),
            },
          }
        );
        res.json({
          dbRes: updateUserDocument,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Document id must be unique",
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

// @route   PATCH api/UserDocument/:id
// @desc    Update A UserDocument
// @access  Private
router.patch("/:id", async (req, res) => {
  const condition = req.body;
  if (!isEmpty(condition)) {
    try {
      const updateUserDocument = await UserDocument.findByIdAndUpdate(
        req.params.id,
        {
          $set: condition,
          updatedAt: Date.now(),
        }
      );
      res.json({
        dbRes: updateUserDocument,
        isSuccess: true,
      });
      res.json(updateUserDocument);
    } catch ({ message: errMessage }) {
      const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
      res.status(500).json(message);
    }
  } else {
    res.status(500).json("User document Cannot be found");
  }
});

// @route   DELETE api/UserDocument/:id
// @desc    Delete A UserDocument
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getUserDocument = await UserDocument.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getUserDocument.length > 0) {
      const deleteUserDocument = await UserDocument.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json({
        dbRes: deleteUserDocument,
        isSuccess: true,
      });
      res.json(deleteUserDocument);
    } else {
      res.status(500).json("User document is already deleted");
    }
  } catch ({ message: errMessage }) {
    const message = errMessage ? errMessage : UNKNOWN_ERROR_OCCURED;
    res.status(500).json(message);
  }
});

module.exports = router;
