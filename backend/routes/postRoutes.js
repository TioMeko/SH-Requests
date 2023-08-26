const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Route to get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new post
router.post("/api/posts", async (req, res) => {
  const { title, content, tags, userId } = req.body;
  const newPost = new Post({
    title,
    content,
    tags,
    upvotes: 1,
    userId,
    comments: [],
  });
  await newPost.save();
  res.status(201).json(newPost);
});

// Upvote a post
router.put("/api/posts/:postId/upvote", async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  post.upvotes += 1;
  await post.save();
  res.status(200).json(post);
});

// Edit a post's content
router.put("/api/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  const post = await Post.findById(postId);
  post.content = content;
  await post.save();
  res.status(200).json(post);
});

module.exports = router;
