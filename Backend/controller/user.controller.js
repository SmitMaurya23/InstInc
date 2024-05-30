import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../cloudinary.js'; // Import Cloudinary configuration
import path from 'path';
import fs from 'fs';


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
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                username:createdUser.username
            },
        });
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


export const showData = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { userId } = req.body;

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
    console.log("req.body is: ", req.body);
    try {
      const { userID,name,username} = req.body;
      if (!userID ) {
        return res.status(400).json({ message: 'User is not found!!!' });
      }
  
      console.log("req.file is: ", req.file);
  
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
  
      const user = await User.findOne({ _id: userID});
      console.log("Our user is: ",user);
      user.name=name;
      user.username=username;
      user.profileImage=result.secure_url;
      await user.save();
      
      const updatedUser=await User.findOne({ _id: userID});

      console.log("Our updated user is: ",user);
      res.status(201).json({
        message: 'Profile Updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  

  
