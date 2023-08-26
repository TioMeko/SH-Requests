const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add a comment to a post
router.post("/api/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content, userId } = req.body;
  const newComment = new Comment({
    content,
    userId,
    deleted: false,
  });
  await newComment.save();

  const post = await Post.findById(postId);
  post.comments.push(newComment);
  await post.save();

  res.status(201).json(newComment);
});

// Edit a comment
router.put("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;
  const comment = await Comment.findById(commentId);
  comment.content = content;
  await comment.save();
  res.status(200).json(comment);
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  comment.deleted = true;
  comment.content = "This comment was deleted.";
  await comment.save();
  res.status(200).json(comment);
});

module.exports = router;
