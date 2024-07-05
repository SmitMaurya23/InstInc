import React, { useState } from "react";
import Logout from "../loginlogout/Logout";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LoginModal from "../loginlogout/LoginModal";
import SignupModal from "../loginlogout/SignupModal";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const handleOpenModalLogin = () => {
    setIsModalVisible(true);
  };

  const handleCloseModalLogin = () => {
    setIsModalVisible(false);
  };

  const handleOpenModalSignup = () => {
    setIsModalVisible2(true);
  };

  const handleCloseModalSignup = () => {
    setIsModalVisible2(false);
  };

  const handleAuthClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      handleOpenModalLogin();
    }
  };

  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/Feed" onClick={handleAuthClick}>
          Feed
        </a>
      </li>
      <li>
        <a href="/ChatPage" onClick={handleAuthClick}>
          Chat
        </a>
      </li>
    </>
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 bg-slate-700 fixed top-0 left-0 right-0 z-50 pt-10">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navItems}
              </ul>
            </div>
            <a className="text-4xl font-bold cursor-pointer">Inst'Inc</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <SearchBar />

            {/* Show username if selfUser exists */}
            <div>{selfUser ? selfUser.username : "New User"}</div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {/* Show profile image if selfUser exists, else show default image */}
                  <img
                    src={
                      selfUser
                        ? selfUser.profileImage
                        : "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/SelfProfile" onClick={handleAuthClick}>
                    <a className="justify-between">Profile</a>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>

            {!authUser ? (
              <div className="">
                <button onClick={handleOpenModalLogin} className="btn btn-secondary">
                  Login
                </button>
              </div>
            ) : (
              <Logout />
            )}
          </div>
        </div>
      </div>
      <LoginModal isVisible={isModalVisible} onClose={handleCloseModalLogin} />
      <SignupModal isVisible={isModalVisible2} onClose={handleCloseModalSignup} />
    </>
  );
}

export default Navbar;
