import React from "react";
import useConversation from "../../../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  
  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`flex items-center p-4 cursor-pointer transition-colors
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-800"}
        border-b border-slate-700 last:border-b-0`}
      onClick={() => setSelectedConversation(user)}
    >
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <img 
          src={user.profileImage || '/default-avatar.png'}
          alt={user.fullname}
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full 
            border-2 border-slate-900" />
        )}
      </div>

      {/* User Info */}
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white truncate">
            {user.fullname}
          </h2>
          {/* Unread count can be added here */}
        </div>
        
        {/* Username */}
        <p className="text-sm text-slate-400 truncate mt-1">
          @{user.username}
        </p>
      </div>

      {/* Status indicator for larger screens */}
      <div className="hidden md:block ml-4">
        {isOnline ? (
          <span className="text-xs text-green-500">Online</span>
        ) : (
          <span className="text-xs text-slate-500">Offline</span>
        )}
      </div>
    </div>
  );
}

export default User;