import express from "express";
import { signup, login,showData,editProfile } from "../controller/user.controller.js";
import upload from '../middlewares/upload.js'; // Ensure this is correctly configured
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/showData", showData);
router.post('/editProfile', upload.single('image'), editProfile);


export default router;