import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import MyComment from './MyComment';

const ViewPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {}; // Ensure destructuring and provide fallback
  const [postUser, setPostUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPostUserData = async () => {
      if (!post) {
        setLoading(false); // Stop loading if post is not available
        return;
      }
      try {
        const responseUser = await axios.post("http://localhost:4001/post/viewPost", { post });
        console.log("responseUser is: ", responseUser);
        setPostUser(responseUser.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data who made post");
      } finally {
        setLoading(false); // Ensure loading is stopped after the API call
      }
    };

    fetchPostUserData();
  }, [post]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (!post) {
    return <div>No post data available</div>; // Handle case where post is not available
  }

  const handlePostClick = (userId) => {
    navigate('/OtherProfile', { state: { userId } });
  };

  return (
    <div className='mx-20 my-5'>
      <div className="card card-side bg-base-100 shadow-xl glass mt-20 h-screen py-20">
        <figure>
        <img src={post.image} alt="Movie" className="h-full object-cover pl-10 rounded-md" />
        </figure>
        <div className="card-body ml-10">
          <h2 className="card-title">
          <div onClick={() => handlePostClick(postUser._id)} style={{ cursor: 'pointer' }}>
          <img src={postUser.profileImage} alt="User" className="inline-block h-20 w-20 rounded-full" /> {postUser.username}
           </div>
          </h2>
          <p> {new Date(post.createdAt).toLocaleString()}</p>
          <p> {post.description}</p>
          <p>Likes: {post.likes}<br />Comments: {post.comments.length}</p>
          <div className="card-actions justify-end">
            <MyComment post={post} />
          </div>
        </div>
      </div>
      <Comments post={post} />
    </div>
  );
};

export default ViewPost;
