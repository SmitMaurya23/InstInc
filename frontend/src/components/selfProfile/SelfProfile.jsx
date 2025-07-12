import React, { useState } from "react";
import Navbar from '../basic/Navbar';
import Footer from '../basic/Footer';
import CreatePostModal from "./CreatePostModal";
import EditProfileModal from "./EditProfileModal";
import SelfFeed from "./SelfFeed";

function SelfProfile() {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  const handleOpenModalCreatePost = () => setIsModalVisible1(true);
  const handleCloseModalCreatePost = () => setIsModalVisible1(false);
  const handleOpenModalEditProfile = () => setIsModalVisible2(true);
  const handleCloseModalEditProfile = () => setIsModalVisible2(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-base-100 shadow-xl rounded-lg p-6">
            {/* Profile Image Section */}
            <div className="flex justify-center mb-8 mt-8">
              <img 
                src={selfUser.profileImage || "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"} 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* User Info Section */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Name:</span>
                <span className="flex-1">{selfUser.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Username:</span>
                <span className="flex-1">@{selfUser.username || "N/A"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold w-24">Email:</span>
                <span className="flex-1 break-all">{selfUser.email || "N/A"}</span>
              </div>
            </div>

             {/* Followers/Following Section */}
             <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Followers:</span>
                  <span>{selfUser.followers?.length || 0}</span>
                </div>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold">Following:</span>
                  <span>{selfUser.following?.length || 0}</span>
                </div>
              </div>
            </div>
          

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                onClick={handleOpenModalEditProfile}
                className="btn btn-primary flex-1"
              >
                Edit Profile
              </button>
              <button 
                onClick={handleOpenModalCreatePost}
                className="btn btn-secondary flex-1"
              >
                Create Post
              </button>
            </div>
          </div>

          <SelfFeed />
        </div>
      </main>

      <Footer />
      <CreatePostModal isVisible={isModalVisible1} onClose={handleCloseModalCreatePost} userId={selfUser.username} />
      <EditProfileModal isVisible={isModalVisible2} onClose={handleCloseModalEditProfile} />
    </div>
  );
}

export default SelfProfile;