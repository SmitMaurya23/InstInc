import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../cloudinary.js'; // Import Cloudinary configuration
import path from 'path';
import fs from 'fs';

// Function to upload file on Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  console.log("localFilePath", localFilePath);
  try {
    if (!localFilePath) return null;

    // Generate a unique identifier for the public_id
    const publicId = uuidv4();

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: 'uploads',
      public_id: publicId, // Use the generated unique file name
    });
    
    // File uploaded successfully
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error uploading file:", error.message);
    console.error("Full error:", error);
    // Attempt to remove the locally saved temporary file if the upload operation failed
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error removing local file:", unlinkError);
    }
    return null;
  }
};

export const createPost = async (req, res) => {
  console.log("Request received for creating post");
  console.log("req.body is: ", req.body);
  try {
    const { description, author } = req.body;
    if (!description || !author) {
      return res.status(400).json({ message: 'Description and author are required' });
    }

    console.log("req.file is: ", req.file);

    // Ensure file is present
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // Upload image to Cloudinary
    console.log("cloudinary: ", cloudinary);
    console.log("cloudinary.uploader is: ", cloudinary.uploader);
    console.log("req.file.path: ", req.file.path);

    const result = await uploadOnCloudinary(req.file.path);

    console.log("result is: ", result);

    if (!result) {
      return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
    }

    // Save the public URL (secure_url) in the database
    const newPost = new Post({
      author: author,
      description: description,
      image: result.secure_url, // Save the public URL
      createdAt: new Date(),
    });

    await newPost.save();

    const user = await User.findOne({ _id: author });
    console.log("Our user is: ", user);
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Assuming the user ID is passed in the request body
    const { userId } = req.body;

    // Find all posts where the author matches the user ID
    const userPosts = await Post.find({ author: userId });

    res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const { userId } = req.body;

    let userPosts;
    if (userId) {
      // If userId exists, retrieve all posts except those where the author is equal to userId
      userPosts = await Post.find({ author: { $ne: userId } });
    } else {
      // If userId doesn't exist, retrieve all posts
      userPosts = await Post.find();
    }

    // Randomize the order of the retrieved posts
    userPosts = userPosts.sort(() => Math.random() - 0.5);
    console.log("userPosts: ",userPosts);

    res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const toggleLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ error: 'Post or User not found' });
    }

    const isLiked = post.likedBy.includes(userId);

    if (isLiked) {
      post.likes -= 1;
      post.likedBy.pull(userId);
      user.likedPosts.pull(postId);
    } else {
      post.likes += 1;
      post.likedBy.push(userId);
      user.likedPosts.push(postId);
    }

    await post.save();
    await user.save();

    res.json({ post, user });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

