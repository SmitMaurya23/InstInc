// src/components/LikeButton.jsx

import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ postId, userId, initialLikes, initiallyLiked }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);

  const handleLikeToggle = async () => {
    try {
      const response = await axios.post('/api/post/toggleLike', {
        postId,
        userId
      });

      const updatedPost = response.data.post;
      setLikes(updatedPost.likes);
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
<div className='flex space-x-4'>
  <button
    onClick={handleLikeToggle}
    className={`btn ${liked ? 'btn-liked' : 'btn-unliked'}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "red" : "white"} className="size-6">
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>{likes}
  </button>
  
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" height="18"   fill="white" className="bi bi-bookmarks-fill size-6" viewBox="0 0 16 16">
    <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z"/>
    <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z"/>
  </svg>
  </button>

  <button>
  <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="white" className="bi bi-send-fill" viewBox="0 0 16 16">
    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
  </svg>
  </button>
</div>

  );
};

export default LikeButton;
