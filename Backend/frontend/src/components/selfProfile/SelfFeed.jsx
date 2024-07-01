import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const SelfFeed = () => {
  const [posts, setPosts] = useState([]);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post('/api/post/getUserPosts', { userId: selfUser._id });

        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (selfUser) {
      fetchPosts();
    }
  }, [selfUser]);
  const navigate = useNavigate();
  const handlePostClick = (post) => {
    navigate('/ViewPost', { state: { post } });
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 my-10 mx-10">
        {posts.map(post => (
          <div key={post._id} className="relative aspect-w-1 aspect-h-1">
           <div onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                <img src={post.image} alt={`Post ${post.image}`} className="object-cover w-full h-full" />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfFeed;
