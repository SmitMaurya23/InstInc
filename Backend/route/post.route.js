import express from "express";
import { createPost, getUserPosts,getAllPosts } from "../controller/post.controller.js";
import { viewPost, viewComment,saveComment } from "../controller/viewPost.controller.js";
import upload from '../middlewares/upload.js'; // Ensure this is correctly configured
const router = express.Router();

router.post("/createPost", upload.single('image'), createPost);
router.post("/getUserPosts", getUserPosts);
router.post("/getAllPosts", getAllPosts);
router.post("/viewPost", viewPost);
router.post("/viewComment", viewComment);
router.post("/saveComment", saveComment);




export default router;