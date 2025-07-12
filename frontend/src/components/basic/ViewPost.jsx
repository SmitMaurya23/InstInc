// src/components/ViewPost.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from '../comments/Comments';
import MyComment from '../comments/MyComment';
import Navbar from './Navbar';
import Footer from './Footer';
import LikeButton from '../comments/LikeButton';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const ViewPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {};
  const [postUser, setPostUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  useEffect(() => {
    const fetchPostUserData = async () => {
      if (!post) {
        setLoading(false);
        return;
      }
      try {
        const responseUser = await axios.post(`${API_BASE_URL}/post/viewPost`, { post });
        setPostUser(responseUser.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data who made post");
      } finally {
        setLoading(false);
      }
    };

    fetchPostUserData();
  }, [post]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!post) {
    return <div className="flex items-center justify-center h-screen">No post data available</div>;
  }

  const handlePostClick = (userId) => {
    navigate('/OtherProfile', { state: { userId } });
  };

  const initiallyLiked = post.likedBy.includes(selfUser._id);

  return (
    <div>
      <Navbar />
      <div className="pt-20 mx-5 my-5 md:mx-20 md:my-10">
        <div className="bg-base-100 shadow-xl glass rounded-lg overflow-hidden flex flex-col md:flex-row mt-10 h-full">
          <figure className="w-full md:w-1/2">
            <img src={post.image} alt="Post" className="w-full h-full object-cover" />
          </figure>
          <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                <div onClick={() => handlePostClick(postUser._id)} className="flex items-center cursor-pointer">
                  <img src={postUser.profileImage} alt="User" className="inline-block h-12 w-12 rounded-full mr-2" />
                  {postUser.username}
                </div>
              </h2>
              <p className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              <p className="mt-4">{post.description}</p>

              
              <div className="mt-2">
                <LikeButton
                  postId={post._id}
                  userId={selfUser._id}
                  initialLikes={post.likes}
                  initiallyLiked={initiallyLiked}
                />
              </div>
            </div>
            <div className="mt-4">
              <MyComment post={post} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Comments post={post} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewPost;
