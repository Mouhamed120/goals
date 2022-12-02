const Goal = require("../models/GoalModel");
const User = require("../models/UserModel");

const asyncHandler = require("express-async-handler");
const getGoal = async (req, res) => {
  const goal = await Goal.find({ userId: req.user.id });
  res.status(200).send(goal);
};
const setGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(401).send("Please enter a text");

  const goal = await Goal.create({ text, userId: req.user.id });
  res.status(200).send(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) return res.status(401).send("Goal not found");
  const user = await User.findById(req.user.id);

  if (!user) return res.send("User not found");
  if (user.id !== goal.userId.toString())
    return res.send("you can modify only your goal");
  const goalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(goalUpdated);
});
const deletGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!goal) return res.status(401).send("Goal not found");
  if (!user) return res.status(401).send("Goal not found");

  if (user.id !== goal.userId.toString())
    return res.status(401).send("you can delete only your goal");
  await Goal.findByIdAndDelete(req.params.id);
  res.status(200).send(`${req.params.id} deleted`);
};

module.exports = { getGoal, setGoal, updateGoal, deletGoal };
