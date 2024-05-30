// SelfProfile.jsx
import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import ProfileImageDisplay from './ProfilePicDisplay';
import CreatePostModal from "./CreatePostModal";
import EditProfileModal from "./EditProfileModal";
import SelfFeed from "./SelfFeed";
import { Link } from "react-router-dom";

function SelfProfile() {

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));


  const handleOpenModalCreatePost = () => {
    setIsModalVisible1(true);
  };

  const handleCloseModalCreatePost = () => {
    setIsModalVisible1(false);
  };

  const handleOpenModalEditProfile = () => {
    setIsModalVisible2(true);
  };

  const handleCloseModalEditProfile = () => {
    setIsModalVisible2(false);
  };
  
  return (
    <>
      <div>
        <Navbar />
        <br></br><br></br><br></br>
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body text-center">
             

              <div>
              <div>
                <img src={selfUser.profileImage} alt="Profile" className="w-20 h-20 md:w-40 md:h-40 rounded-full border-4 border-white hover:border-primary transition duration-300" />
              </div>

              <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
    </div>
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    </div>
    <div className="stat-title">New Registers</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
  
</div>
              </div>


              <div>

                <div className="card-actions mt-4 mb-10 flex flex-col md:flex-row justify-around ">
                  <div>
                    <h3 className="font-bold">Name:</h3>
                    <p>{selfUser.name}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Username:</h3>
                    <p>{selfUser.username}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Email:</h3>
                    <p>{selfUser.email}</p>
                  </div>
                </div>

                
                <div className="card-actions mt-4 flex flex-col md:flex-row justify-around">
                <button onClick={handleOpenModalEditProfile}className="btn btn-secondary">Edit Profile</button>
                <button className="btn btn-accent" onClick={handleOpenModalCreatePost}>Create Post</button>
              </div>


              </div>
             
              
            </div>
          </div>
        </div>
        <SelfFeed />
        <Footer />
      </div>
      <CreatePostModal isVisible={isModalVisible1} onClose={handleCloseModalCreatePost} userId={selfUser.username} />
      <EditProfileModal isVisible={isModalVisible2} onClose={handleCloseModalEditProfile} />
    </>
  );
}

export default SelfProfile;
