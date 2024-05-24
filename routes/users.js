const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { idValidation, updateValidation } = require("../middlewares/validation");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateValidation, idValidation, updateProfile);

module.exports = router;
