import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ViewComment({ comment }) {
  const [commentUser, setCommentUser] = useState(null);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));
  
  useEffect(() => {
    const fetchCommentUserData = async () => {
      if (!comment) {
        // Stop loading if comment is not available
        return;
      }
      try {
        const response = await axios.post("http://localhost:4001/post/viewComment", { comment });
        console.log("commentUser is: ", response.data.user);
        setCommentUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data who made comment");
      }
    };

    fetchCommentUserData();
  }, [comment]);
  
  if (!commentUser) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      {/* Display commentUser data */}
      <p><img src={commentUser.profileImage} alt="User" className="inline-block h-10 w-10 rounded-full " /> {commentUser.username}</p>
      <p>{comment.text}</p>
    </div>
  );
}

export default ViewComment;
