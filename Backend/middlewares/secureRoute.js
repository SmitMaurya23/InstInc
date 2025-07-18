// src/middlewares/secureRoute.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // <--- LOOKING FOR COOKIE HERE!
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" }); // Standard 401
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" }); // Standard 401
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "No user found" }); // Standard 401
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in secureRoute: ", error); // Use console.error
    // Differentiate token errors for better debugging on client if needed
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token signature or malformed token.' });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
export default secureRoute;