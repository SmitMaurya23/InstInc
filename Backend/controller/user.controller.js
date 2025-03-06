import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../cloudinary.js'; // Import Cloudinary configuration
import path from 'path';
import fs from 'fs';
import createTokenAndSaveCookie from '../jwt/generateToken.js'; 


export const signup = async(req, res) => {
    try {
        const { name,email,username, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            name: name,
            email: email,
            username: username,
            password: hashPassword,
        });
        await createdUser.save();
        if(createdUser){
          createTokenAndSaveCookie(createdUser._id,res);
          res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                username:createdUser.username
            },
        });
        }
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: "Invalid username or password" });
        }

        console.log("User found:", user);

        if (!user.password) {
            console.log("User password is undefined");
            return res.status(500).json({ message: "User password is undefined" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) { 
            return res.status(400).json({ message: "Invalid username or password" });
        }

        createTokenAndSaveCookie(user._id,res);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                posts: user.posts,
                date: user.date,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

export const showData = async (req, res) => {
    console.log("Request body:", req.body);
    const userId  = req.body.userId;
    try {
        const user = await User.findOne({ _id: userId}); // Corrected to query by _id
        if (!user) {
            console.log("User not found with userID", userId);
            return res.status(400).json({ message: "Invalid userID" });
        }

        console.log("User found:", user);

        res.status(200).json({
            message: "Here is the user Data",
            user: user
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
      console.error("Error uploading file:", error);
      // Attempt to remove the locally saved temporary file if the upload operation failed
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkError) {
        console.error("Error removing local file:", unlinkError);
      }
      return null;
    }
  };

  export const editProfile = async (req, res) => {
    console.log("Request received for editing Profile");
    try {
        const { userID, name, username } = req.body;
        
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update image only if new file is uploaded
        if (req.file) {
            const result = await uploadOnCloudinary(req.file.path);
            if (!result) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
            }
            user.profileImage = result.secure_url;
        }

        // Update name and username only if provided
        if (name) user.name = name;
        if (username) user.username = username;

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: user
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
};

  export const searchUsers = async (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    try {
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } }
        ]
      }).limit(10);
  
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


