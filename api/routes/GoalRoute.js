const {
  getGoal,
  setGoal,
  updateGoal,
  deletGoal,
} = require("../controllers/GoalController");
const { protect } = require("../middlewares/protect");

const router = require("express").Router();

router.get("/", protect, getGoal);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deletGoal);

module.exports = router;
