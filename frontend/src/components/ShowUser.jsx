import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ShowUser() {
  const [userData, setUserData] = useState(null);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post("http://localhost:4001/user/showData", { userID: selfUser._id });
        setUserData(response.data.user);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data");
      }
    };
    if (selfUser && selfUser._id) {
      fetchUserData();
    }
  }, [selfUser]);

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
