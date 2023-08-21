const express = require("express");
const { PostModel } = require("../models/postModel");
const { auth } = require("../middlewares/auth.middleware");

const postRouter = express.Router();

postRouter.post("/add", auth, async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "Post Added successfully", post: post });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postRouter.get("/", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postRouter.patch("/update/:postID", auth, async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (post.userID !== req.body.userID) {
      res.send({ Message: "You are not authorized" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.send({ Message: "Post is updated successfully" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

postRouter.delete("/delete/:postID", auth, async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (post.userID !== req.body.userID) {
      res.send({ Message: "You are not authorized" });
    } else {
      await PostModel.findByIdAndDelete({ _id: postID });
      res.send({ Message: "Post is deleted successfully" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = { postRouter };
