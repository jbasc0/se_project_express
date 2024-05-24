const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { idValidation } = require("../middlewares/validation");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", idValidation, updateProfile);

module.exports = router;
