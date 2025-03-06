import React from "react";
import useConversation from "../../../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 transition-colors duration-200 rounded-lg mt-4 mx-4 mb-2">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-600">
            <img 
              src={selectedConversation?.profileImage} 
              alt={selectedConversation?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 
            ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-white">
            {selectedConversation?.name}
          </h2>
          <span className="text-xs mt-1">
            {isOnline ? (
              <span className="flex items-center text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Online
              </span>
            ) : (
              <span className="text-slate-500">Offline</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;