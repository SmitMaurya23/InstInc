import React, { useState } from 'react';
import axios from 'axios';

const MyComment = ({ post }) => {
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    // Reset error message when user starts typing
    setErrorMessage('');
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      // If comment is empty or contains only whitespace
      setErrorMessage('Please enter a comment.');
      return;
    }

    try {
      // Send comment data to backend
      const response = await axios.post('http://localhost:4001/post/saveComment', {
        post: post,
        commentData: { text: comment }, // Assuming commentData requires text property
        selfUserId: selfUser._id,
      });
      
      // Handle successful comment submission (optional)
      console.log('Comment submitted:', response.data);
      // Clear comment input
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="mt-4">
      <p><img src={selfUser.profileImage} alt="User" className="inline-block h-10 w-10 rounded-full " /> {selfUser.username}</p>
      <textarea
        className="textarea px-3 py-2 border rounded-lg w-full"
        placeholder="Write your comment here..."
        value={comment}
        onChange={handleCommentChange}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button 
        onClick={handleSubmitComment}
        className="btn btn-secondary text-slate-300 " 
      >
        Submit Comment
      </button>
    </div>
  );
};

export default MyComment;
