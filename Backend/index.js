import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.MongoDBURI;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with proper error handling
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1);
});

// Define routes
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/message", messageRoute);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
