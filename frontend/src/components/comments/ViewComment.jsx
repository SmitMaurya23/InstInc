import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
        const response = await axios.post(`${BACKEND_URL}/post/viewComment`, { comment });
        console.log("commentUser is: ", response.data.user);
        setCommentUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data who made comment");
      }
    };

    fetchCommentUserData();
  }, [comment]);
  
  const navigate = useNavigate();
  const handlePostClick = (userId) => {
    navigate('/OtherProfile', { state: { userId } });
  };

  if (!commentUser) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      {/* Display commentUser data */}
      <div onClick={() => handlePostClick(commentUser._id)} className="flex items-center cursor-pointer">
        <p><img src={commentUser.profileImage} alt="User" className="inline-block h-10 w-10 rounded-full " /> {commentUser.username}</p>
      </div>
      <p>{comment.text}</p>
    </div>
  );
}

export default ViewComment;



