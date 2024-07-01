import Post from '../models/post.model.js';
import User from '../models/user.model.js';


export const viewPost = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { post } = req.body;

        if (!post) {
            console.log("Post not found!");
            return res.status(400).json({ message: "Invalid post" });
        }

        const user = await User.findOne({ _id: post.author });

        if (!user) {
            console.log("User not found who has created this post!!");
            return res.status(400).json({ message: "Invalid user" });
        }

        console.log("User found:", user);

        res.status(200).json({
            message: "Here is the post and user data who made the post",
            user: user,
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const viewComment= async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const {comment}=req.body;
        
        const user = await User.findOne({ _id: comment.author});
        console.log(user);
        console.log(comment.author);

        if (!user) {
            console.log("User not found who has commented this!");
            return res.status(400).json({ message: "Invalid user" });
        }

        console.log("User found:", user);

        res.status(200).json({
            message: "Here is the user and post Data",
            user: user,
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const saveComment = async (req, res) => {
    try {
        const { post, commentData, selfUserId } = req.body;

        // Check if required data is provided
        if (!post || !commentData || !selfUserId) {
            return res.status(400).json({ message: "Missing required data" });
        }

        const commentedPost=await Post.findOne({ _id:post._id});
        console.log("selfUserId: ",selfUserId);
        // Create a new comment based on the commentSchema
        const newComment = {
            author: selfUserId, // Assign the author of the comment
            text: commentData.text // Assign the text of the comment
        };
        console.log("comment.author: ",newComment.author);

        // Push the new comment into the post's comments array
        commentedPost.comments.push(newComment);
        
        // Save the post with the new comment
        await commentedPost.save();

        // Return the saved comment in the response
        res.status(200).json({ message: "Comment saved", comment: newComment });
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


