const mongoose = require("mongoose");
const goalSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    text: { type: String, required: [true, "Please enter a text"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);
