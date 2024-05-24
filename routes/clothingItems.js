const router = require("express").Router();
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
// const { middleware } = require("../middlewares/auth");
const {
  createItemValidation,
  idValidation,
} = require("../middlewares/validation");

// Returns all clothing items
router.get("/items", getClothingItems);

// Creates a new clothing item
router.post("/items", createItemValidation, createNewClothingItem);

// Deletes a clothing item
router.delete("/items/:itemId", idValidation, deleteClothingItem);

// Likes a clothing item
router.put("/items/:itemId/likes", idValidation, likeItem);

// Dislikes a clothing item
router.delete("/items/:itemId/likes", idValidation, dislikeItem);

module.exports = router;
