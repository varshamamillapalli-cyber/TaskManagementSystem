const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(
  process.env.MONGO_URI
)
.then(() => {
  console.log("MongoDB Atlas Connected");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
});

// Comment Schema
const CommentSchema = new mongoose.Schema({
  username: String,
  comment: String
});

// Model
const Comment = mongoose.model(
  "Comment",
  CommentSchema
);

// Home Route
app.get("/", (req, res) => {
  res.send("Node.js Backend Running Successfully");
});

// Get All Comments
app.get("/comments", async (req, res) => {
  try {

    const comments = await Comment.find();

    res.json(comments);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

// Add Comment
app.post("/comments", async (req, res) => {

  try {

    const comment = await Comment.create({
      username: req.body.username,
      comment: req.body.comment
    });

    res.json(comment);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

// Delete Comment
app.delete("/comments/:id", async (req, res) => {

  try {

    await Comment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Comment Deleted"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Node Server Running on Port ${PORT}`
  );

});
