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

  const handleOpenModalLogin = () => setIsModalVisible(true);
  const handleCloseModalLogin = () => setIsModalVisible(false);
  const handleOpenModalSignup = () => setIsModalVisible2(true);
  const handleCloseModalSignup = () => setIsModalVisible2(false);

  const handleAuthClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      handleOpenModalLogin();
    }
  };

  const navItems = (
    <>
      <li>
        <a href="/" className="hover:text-gray-300">Home</a>
      </li>
      <li>
        <a href="/Feed" onClick={handleAuthClick} className="hover:text-gray-300">Feed</a>
      </li>
      <li>
        <a href="/ChatPage" onClick={handleAuthClick} className="hover:text-gray-300">Chat</a>
      </li>
    </>
  );

  return (
    <>
      <nav className="bg-slate-700 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  {navItems}
                  {authUser && (
                    <>
                      <li>
                        <Link to="/SelfProfile" className="hover:bg-gray-100">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Logout className="hover:bg-gray-100" />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Brand name - centered on mobile */}
            <div className="flex-shrink-0 lg:hidden">
              <h1 className="text-2xl font-bold text-white">Inst'Inc</h1>
            </div>

            {/* Desktop left section */}
            <div className="hidden lg:flex items-center">
              <h1 className="text-2xl font-bold text-white mr-8">Inst'Inc</h1>
              <div className="hidden lg:flex items-center space-x-4">
                <ul className="flex space-x-4 text-white">{navItems}</ul>
              </div>
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="hidden lg:block flex-1 max-w-xl mx-4">
              <SearchBar />
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Mobile search bar (hidden on desktop) */}
              <div className="lg:hidden absolute top-16 left-0 right-0 px-4 py-2 bg-slate-700">
                <SearchBar />
              </div>

              {/* Profile section */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        selfUser?.profileImage ||
                        "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  {authUser ? (
                    <>
                      <li>
                        <Link to="/SelfProfile" className="hover:bg-gray-100">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Logout className="hover:bg-gray-100" />
                      </li>
                    </>
                  ) : (
                    <li>
                      <button onClick={handleOpenModalLogin} className="btn btn-secondary">
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Desktop login button (hidden when logged in) */}
              {!authUser && (
                <div className="hidden lg:block">
                  <button
                    onClick={handleOpenModalLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal isVisible={isModalVisible} onClose={handleCloseModalLogin} />
      <SignupModal isVisible={isModalVisible2} onClose={handleCloseModalSignup} />
    </>
  );
}

export default Navbar;