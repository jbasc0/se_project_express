const router = require("express").Router();
const {
  getClothingItems,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { middleware } = require("../middlewares/auth");

// Returns all clothing items
router.get("/items", getClothingItems);

// Creates a new clothing item
router.post("/items", middleware, createNewClothingItem);

// Deletes a clothing item
router.delete("/items/:itemId", middleware, deleteClothingItem);

// Likes a clothing item
router.put("/items/:itemId/likes", middleware, likeItem);

// Dislikes a clothing item
router.delete("/items/:itemId/likes", middleware, dislikeItem);

module.exports = router;
