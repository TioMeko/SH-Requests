require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/connection"); // Import the DB connection

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Use the Routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
