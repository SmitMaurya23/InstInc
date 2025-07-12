import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {

       try {
          const res = await axios.get(
            `${API_BASE_URL}/message/get/${selectedConversation._id}`
          );
          console.log("res is: ",res);
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
