import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ViewPost = () => {
  const { postID } = useParams();
  console.log("postID: ", postID);
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.post(`http://localhost:4001/post/viewPost`, { postID: postID });
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error("Error fetching post data");
      }
    };

    if (postID) {
      fetchPostData();
    }
  }, [postID]);
  useEffect(() => {
    const fetchPostUserData = async () => {
      if (!post) return;
      try {
        const responseUser = await axios.post("http://localhost:4001/post/viewPost", { postID: postID });
        setPostUser(responseUser.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data who made post");
      }
    };

    fetchPostUserData();
  }, [postID]);

  if (!postID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <img src={postUser.profileImage} alt="Profile" className="w-20 h-20 md:w-40 md:h-40 rounded-full border-4 border-white hover:border-primary transition duration-300" />
          <p className="text-center mt-2">{postUser.username}</p>
        </div>
        <div className="md:w-3/4 mt-4 md:mt-0 md:ml-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <p className="font-bold">{post.description}</p>
              <img src={post.image} alt="Post" className="mt-4 w-full" />
              <div className="flex justify-between mt-4">
                <div>
                  <p className="font-bold">Likes: {post.likes}</p>
                  <p className="font-bold">Comments: {post.comments.length}</p>
                </div>
                <div>
                  {/* Add like and comment buttons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
