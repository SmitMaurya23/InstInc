import express from "express";
import { signup, login,logout,showData,editProfile,searchUsers,allUsers} from "../controller/user.controller.js";
import upload from '../middlewares/upload.js'; 
import secureRoute from '../middlewares/secureRoute.js';// Ensure this is correctly configured
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/showData", showData);
router.post('/editProfile', upload.single('image'), editProfile);
router.get('/search', searchUsers);
router.get('/logout', logout);
router.get('/allUsers',secureRoute, allUsers);





export default router;