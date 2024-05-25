const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { updateValidation } = require("../middlewares/validation");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateValidation, updateProfile);

module.exports = router;
