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
    <>
      <div>
        <Navbar />
        <br/><br/><br/>
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div>
                <img src={user.profileImage} alt="Profile" className="w-20 h-20 md:w-40 md:h-40 rounded-full border-4 border-white hover:border-primary transition duration-300" />
              </div>

              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="stat-title">Posts</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  </div>
                  <div className="stat-title">Followers</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                  </div>
                  <div className="stat-title">Following</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>

              <div>
                <div className="card-actions mt-4 mb-10 flex flex-col md:flex-row justify-around ">
                  <div>
                    <h3 className="font-bold">Name:</h3>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Username:</h3>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Email:</h3>
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OtherFeed userId={user._id} />
        <Footer />
      </div>
    </>
  );
}

export default OtherProfile;
