const express = require("express");

const router = express.Router();

const users = require("./users");

const clothingItems = require("./clothingItems");

// const { NOT_FOUND_ERROR } = require("../utils/errors");

const { login, createUser } = require("../controllers/users");

const { middleware } = require("../middlewares/auth");

const {
  loginValidation,
  createUserValidation,
} = require("../middlewares/validation");

const NotFoundError = require("../utils/errors/NotFoundError");

router.post("/signin", loginValidation, login);

router.post("/signup", createUserValidation, createUser);

router.use("/", clothingItems);

router.use("/", middleware, users);

// Handle non-existent resource
router.use((req, res) => {
  next(new NotFoundError("Requested resource not found"));
  // res.status(NOT_FOUND_ERROR).json({ message: "Requested resource not found" });
});

module.exports = router;
