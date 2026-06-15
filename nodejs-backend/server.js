const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/taskcomments")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
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

// GET ALL COMMENTS
app.get("/comments", async (req, res) => {

    const comments = await Comment.find();

    res.json(comments);
});

// ADD COMMENT
app.post("/comments", async (req, res) => {

    const comment = await Comment.create({
        username: req.body.username,
        comment: req.body.comment
    });

    res.json(comment);
});

// DELETE COMMENT
app.delete("/comments/:id", async (req, res) => {

    await Comment.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message: "Comment Deleted"
    });
});

// Start Server
app.listen(5000, () => {

    console.log(
        "Node Server Running on Port 5000"
    );
});