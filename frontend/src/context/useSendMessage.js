import React, { useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/message/send/${selectedConversation._id}`,
          { message },
          {withCredentials: true}
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
