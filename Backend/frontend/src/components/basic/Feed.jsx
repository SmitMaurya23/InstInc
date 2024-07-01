import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [selfUser, setSelfUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("selfUser"));
    setSelfUser(user);
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      if (selfUser) {
        const response = await axios.post('/api/post/getAllPosts', { userId: selfUser._id });
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [selfUser]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const navigate = useNavigate();
  const handlePostClick = (post) => {
    navigate('/ViewPost', { state: { post } });
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-4 gap-6 my-10 mx-10 mt-30" style={{ marginTop: '100px' }}>
        {posts.map(post => (
          <div key={post._id} className="relative aspect-w-1 aspect-h-1">
            <div onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
              <img src={post.image} alt={`Post ${post._id}`} className="object-cover w-full h-full" />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Feed;
