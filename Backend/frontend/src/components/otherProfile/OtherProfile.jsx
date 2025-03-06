import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../basic/Navbar";
import Footer from '../basic/Footer';
import OtherFeed from "./OtherFeed";
import { useLocation } from "react-router-dom";
import axios from "axios";

function OtherProfile() {
  const location = useLocation();
  const { userId } = location.state || {}; 
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  const fetchUser = useCallback(async () => {
    try {
      console.log("user id is: ", userId);
      const response = await axios.post('/api/user/showData', { userId });
      setUser(response.data.user);
      setPosts(response.data.user.posts);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-base-100 shadow-xl rounded-lg p-6">
            {/* Profile Image with spacing */}
            <div className="flex justify-center mb-8 mt-8">
              <img 
                src={user.profileImage || "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"} 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* User Info Section */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Name:</span>
                <span className="flex-1">{user.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Username:</span>
                <span className="flex-1">@{user.username || "N/A"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Email:</span>
                <span className="flex-1 break-all">{user.email || "N/A"}</span>
              </div>
            </div>

            {/* Followers/Following Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Followers:</span>
                  <span>{user.followers?.length || 0}</span>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Following:</span>
                  <span>{user.following?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <OtherFeed userId={user._id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OtherProfile;