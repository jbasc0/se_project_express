const ClothingItem = require("../models/clothingItem");
// const {
//   INVALID_DATA_ERROR,
//   NOT_FOUND_ERROR,
//   SERVER_ERROR,
//   FORBIDDEN_ERROR,
// } = require("../utils/errors");
const BadRequestError = require("../utils/errors/BadRequestError");
const ConflictError = require("../utils/errors/ConflictError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      console.error(err);
      next(err);
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// Create new clothing item
const createNewClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((newItem) => res.send(newItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   return res
      //     .status(INVALID_DATA_ERROR)
      //     .send({ message: "Invalid data provided" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// Delete clothing item
const deleteClothingItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        next(new ForbiddenError("You are not authorized to delete this item"));
        // return res
        //   .status(FORBIDDEN_ERROR)
        //   .send({ message: "You are not authorized to delete this item" });
      }
      return item.deleteOne().then(() =>
        res.send({
          message: `Item: ${item._id} deleted successfully`,
        }),
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR)
      //     .send({ message: "Invalid item ID" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// Like Item
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.send({
        // message: `Item with ID ${updatedItem._id} liked successfully`,
        updatedItem,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR)
      //     .send({ message: "Invalid item ID" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// Dislike Item
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((updatedItem) => {
      res.send({
        // message: `Item with ID ${updatedItem._id} disliked successfully`,
        updatedItem,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
      //   return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR)
      //     .send({ message: "Invalid item ID" });
      // }
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
