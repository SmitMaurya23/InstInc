import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import cookieParser from "cookie-parser";
import path from "path";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.log("Error: ", error));

// Define routes
app.use("/api/user", userRoute); //Must to write /api/user it will not work in for two separate folders
app.use("/api/post", postRoute);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();
    app.use(express.static("./frontend/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath,"./frontend/dist", "index.html"));
    });
}


// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});