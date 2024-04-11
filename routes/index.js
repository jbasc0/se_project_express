const express = require("express");

const router = express.Router();

const users = require("./users");

const clothingItems = require("./clothingItems");

const { NOT_FOUND_ERROR } = require("../utils/errors");

const { login, createUser } = require("../controllers/users");

const { middleware } = require("../middlewares/auth");

router.post("/signin", login);

router.post("/signup", createUser);

router.use("/", clothingItems);

router.use("/", middleware, users);

// Handle non-existent resource
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: "Requested resource not found" });
});

module.exports = router;
