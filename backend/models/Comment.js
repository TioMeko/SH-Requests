const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: mongoose.Schema.Types.ObjectId,
  deleted: Boolean,
});

module.exports = mongoose.model("Comment", CommentSchema);
