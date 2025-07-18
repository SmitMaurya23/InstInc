import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie"; // You might not even need this import anymore if not reading non-HttpOnly cookies
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/user/allUsers`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;