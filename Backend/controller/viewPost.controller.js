import Post from '../model/post.model.js';
import User from '../model/user.model.js';


export const viewPost = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { postID } = req.body;
        const post = await Post.findOne({ _id: postID });

        if (!post) {
            console.log("Post not found!");
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const user = await User.findOne({ _id: post._author });

        if (!user) {
            console.log("User not found who has created this post!!");
            return res.status(400).json({ message: "Invalid user" });
        }

        console.log("User found:", user);

        res.status(200).json({
            message: "Here is the post and user data who made the post",
            user: user,
            post: post,
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const viewComment= async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const {comment} = req.body;

        const user = await User.findOne({ _id: comment.author});

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