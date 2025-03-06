import React, { useEffect } from "react";
import Chatuser from "./Chatuser"; 
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../../../zustand/useConversation.js";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full h-full bg-slate-900 text-gray-300 flex flex-col">
      <div className="flex-1 flex flex-col pt-8"> {/* Reduced from pt-16 to pt-8 */}
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-4 pb-2 ">
              <Chatuser />
            </div>
            
            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto px-4 pb-2"
              style={{ maxHeight: 'calc(100vh - 16rem)' }} // Adjusted from 20rem to 16rem
            >
              <Messages />
            </div>
            
            {/* Input Box */}
            <div className="pt-2 pb-4 px-4 border-t border-gray-700">
              <Typesend />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-4 pt-8"> {/* Reduced from pt-16 to pt-8 */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-20"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Welcome <span className="text-blue-400">{authUser.name}</span>
        </h1>
        <p className="text-gray-400">
          Select a conversation from the menu to start chatting
        </p>
      </div>
    </div>
  );
};

export default Right;