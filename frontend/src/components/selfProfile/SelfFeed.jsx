import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const SelfFeed = () => {
  const [posts, setPosts] = useState([]);
  // Initialize selfUser state
  const [selfUser, setSelfUser] = useState(null); // Initialize with null or undefined
  const navigate = useNavigate();

  // Effect to load selfUser from localStorage once on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("selfUser");
    if (storedUser) {
      setSelfUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array: runs only once on mount

  // Effect to fetch posts when selfUser changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (selfUser && selfUser._id) { // Ensure selfUser and its ID exist
          const response = await axios.post(`${BACKEND_URL}/post/getUserPosts`, { userId: selfUser._id });
          setPosts(response.data.posts);
        } else {
          // Handle case where selfUser is not available (e.g., user not logged in)
          setPosts([]); // Clear posts if no user
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [selfUser]); // <--- Dependency array now correctly tracks changes to selfUser state

  const handlePostClick = (post) => {
    navigate('/ViewPost', { state: { post } });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Add a loading state or message if posts are empty and user is valid */}
      {!selfUser && <p>Please log in to view your posts.</p>}
      {selfUser && posts.length === 0 && <p>No posts found.</p>}
      {selfUser && posts.length > 0 && (
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
      )}
    </div>
  );
};

export default SelfFeed;