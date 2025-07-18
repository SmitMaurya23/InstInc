import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {

       try {
          const res = await axios.get(
            `${BACKEND_URL}/message/get/${selectedConversation._id}`,
            { withCredentials: true }
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
