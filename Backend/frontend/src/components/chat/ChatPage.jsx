import React from "react";
import Left from "./Leftpart/Left";
import Right from "./Rightpart/Right";
import { useAuth } from "../../context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../basic/Navbar";



function ChatPage() {
    const [authUser, setAuthUser] = useAuth();
    console.log(authUser);
    return (
      <>
      <Navbar/>
      <br></br> <br></br> <br></br> <br></br><br></br>
                <div className="drawer lg:drawer-open">
                  <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content flex flex-col items-center justify-center">
                    <Right />
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu w-80 min-h-full bg-black text-base-content">
                      <Left />
                    </ul>
                  </div>
                </div>
        <Toaster />
      </>
    );
}

export default ChatPage