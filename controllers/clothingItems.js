const ClothingItem = require("../models/clothingItem");
const {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find()
    .then((items) => {
      if (!items.length) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Items not found" });
      }
      return res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Create new clothing item
const createNewClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res
      .status(INVALID_DATA_ERROR)
      .send({ message: "Name, weather, and imageUrl are required" });
  }

  if (name.length < 2 || name.length > 30) {
    return res
      .status(INVALID_DATA_ERROR)
      .send({ message: "Name must be between 2 and 30 characters long" });
  }

  ClothingItem.create({ name, weather, imageUrl })
    .then((newItem) => res.status(201).send(newItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Delete clothing item
const deleteClothingItem = (req, res) => {
  if (!req.params.itemId) {
    return res.status(INVALID_DATA_ERROR).send({ message: "Invalid Data" });
  }

  ClothingItem.findByIdAndDelete(req.params.itemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      return res.send({
        message: `Item: ${deletedItem._id} deleted successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
};
