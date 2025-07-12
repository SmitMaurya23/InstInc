import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtherFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      if (userId) {
        const response = await axios.post('/api/post/getUserPosts', { userId });
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostClick = (post) => {
    navigate('/ViewPost', { state: { post } });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              
              {/* Mobile Caption Overlay */}
              {post.caption && (
                <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Caption */}
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
  );
};

export default OtherFeed;