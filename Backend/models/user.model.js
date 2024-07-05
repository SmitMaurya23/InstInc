import mongoose from "mongoose";
import Post from "./post.model.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required:true},
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    date: { type: Date, default: Date.now },
    profileImage: {
      type: String,
      default: "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg" // replace with the path to a default profile image
    },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedPosts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  });


const User = mongoose.model("User", userSchema);
export default User;