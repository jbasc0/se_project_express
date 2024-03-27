const router = require("express").Router();
const { likeItem, dislikeItem } = require("../controllers/likes");

// Add Like
router.put("/items/:itemId/likes", likeItem);

// Delete Like
router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
