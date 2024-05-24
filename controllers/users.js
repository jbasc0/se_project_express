const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
// const {
//   INVALID_DATA_ERROR,
//   NOT_FOUND_ERROR,
//   SERVER_ERROR,
//   MONGO_ERROR,
//   UNAUTHORIZED_ERROR,
// } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Email or password is invalid"));
    return;
    // return res
    //   .status(INVALID_DATA_ERROR)
    //   .send({ message: "Email or password is invalid" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, avatar, email, password: hashedPassword });
    })
    .then((newUser) =>
      res.status(201).send({
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
      }),
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (err.name === "MongoServerError") {
        next(new ConflictError("Email is already registered"));
      } else {
        next(err);
      }
      //   return res
      //     .status(INVALID_DATA_ERROR)
      //     .send({ message: "Invalid data provided" });
      // }
      // if (err.name === "MongoServerError") {
      //   return res
      //     .status(MONGO_ERROR)
      //     .send({ message: "Error on MongoDB Server or duplicate email" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// Authenticate login
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Email or password is invalid"));
    return;
    // return res
    //   .status(INVALID_DATA_ERROR)
    //   .send({ message: "Email or password is invalid" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
        //   return res.status(INVALID_DATA_ERROR).send({ message: "Invalid data" });
        // }
        // if (err.message === "Incorrect email or password") {
        //   return res
        //     .status(UNAUTHORIZED_ERROR)
        //     .send({ message: "Incorrect email or password" });
        // }
        // return res
        //   .status(SERVER_ERROR)
        //   .json({ message: "An error has occurred on the server" });
      }
    });
};

// get current user
const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  return User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   res.status(NOT_FOUND_ERROR).send({ message: "User not found" });
      // } else if (err.name === "CastError") {
      //   res.status(INVALID_DATA_ERROR).send({ message: "Invalid data" });
      // }
      // res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// update current user
const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   return res.status(INVALID_DATA_ERROR).send({ message: "Invalid data" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .json({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
