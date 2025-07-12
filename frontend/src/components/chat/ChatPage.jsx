import React from "react";
import Left from "./Leftpart/Left";
import Right from "./Rightpart/Right";
import { useAuth } from "../../context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Navbar from "../basic/Navbar";
import useConversation from "../../../zustand/useConversation";

function ChatPage() {
  const [authUser] = useAuth();
  const { selectedConversation, setSelectedConversation } = useConversation();

  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-base-100">
      <Navbar />
      
      {/* Main container with fixed height below navbar */}
      <div className="flex-1 flex overflow-hidden pt-16">
        <div className="drawer lg:drawer-open w-full h-full">
          <input 
            id="chat-drawer" 
            type="checkbox" 
            className="drawer-toggle" 
            checked={!selectedConversation}
            onChange={() => {}} // Empty handler to suppress React warning
          />
          
          {/* Right Part - Chat Messages */}
          <div className="drawer-content flex flex-col h-[calc(100vh-4rem)]">
            {/* Mobile menu buttons */}
            {!selectedConversation ? (
              <label 
                htmlFor="chat-drawer" 
                className="btn btn-ghost lg:hidden absolute left-2 top-20 z-10 p-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </label>
            ) : (
              <label 
                htmlFor="chat-drawer" 
                className="btn btn-ghost lg:hidden absolute left-2 top-20 z-10 p-2"
                onClick={() => setSelectedConversation(null)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
              </label>
            )}
            
            <div className="flex-1 flex flex-col overflow-hidden p-4">
              <Right />
            </div>
          </div>
          
          {/* Left Part - Chat List */}
          <div className="drawer-side h-full z-20">
            <label 
              htmlFor="chat-drawer" 
              aria-label="close sidebar" 
              className="drawer-overlay"
            ></label>
            <div className="w-full lg:w-80 bg-base-200 border-r border-base-300 h-[calc(100vh-4rem)] flex flex-col p-4">
              <Left />
            </div>
          </div>
        </div>
      </div>

      <Toaster 
        position="bottom-right"
        containerStyle={{
          bottom: '80px',
          right: '20px',
        }}
        toastOptions={{
          className: 'bg-base-200 text-base-content',
        }}
      />
    </div>
  );
}

export default ChatPage;