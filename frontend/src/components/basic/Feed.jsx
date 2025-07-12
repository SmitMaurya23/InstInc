import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

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
        const response = await axios.post(`${API_BASE_URL}/post/getAllPosts`, { userId: selfUser._id });
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-10 py-6" style={{ marginTop: '100px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div 
                  onClick={() => handlePostClick(post)} 
                  className="cursor-pointer"
                >
                  <img 
                    src={post.image} 
                    alt={`Post ${post._id}`} 
                    className="w-full h-48 md:h-60 object-cover transform transition-transform duration-200 group-hover:scale-105" 
                  />
                  {/* Add caption overlay for mobile */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    {post.caption && (
                      <p className="text-white text-sm line-clamp-2">
                        {post.caption}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Desktop caption */}
                {post.caption && (
                  <div className="hidden md:block p-3">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feed;