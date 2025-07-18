import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ShowUser() {
  const [userData, setUserData] = useState(null);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/user/showData`, { userId: selfUser._id });
        const otherUsers = await axios.get(`${BACKEND_URL}/user/allUsers`, { userId: selfUser._id });
        console.log("other users are: ", otherUsers);

        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data");
      }
    };
    if (selfUser && selfUser._id) {
      fetchUserData();
    }
  }, []); // Empty dependency array means this will run only once

  return (
    <div>
      {userData && (
        <>
          <div>Name: {userData.name}</div>
          <div>Username: {userData.username}</div>
          <div>Email: {userData.email}</div>
          <div>Password: {userData.password}</div>
          <div>Date of Joining: {userData.date}</div>
          <div>Profile Image: {userData.profileImage}</div>
        </>
      )}
    </div>
  );
}

export default ShowUser;
