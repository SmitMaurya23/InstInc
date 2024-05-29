// models/Post.js
import mongoose from "mongoose";
import User from "./user.model.js";

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, default: null }
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: null }, // Assuming you store the path to the image file
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

const Post = mongoose.model("Post", postSchema);
export default Post;
