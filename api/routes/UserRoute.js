const { registerUser, loginUser } = require("../controllers/UserController");
const { protect } = require("../middlewares/protect");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", protect, loginUser);

module.exports = router;
