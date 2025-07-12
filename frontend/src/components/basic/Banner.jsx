import React, { useState } from "react";
import SignupModal from "../loginlogout/SignupModal"
import { Link } from "react-router-dom"
function Banner() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalSignup = () => {
    setIsModalVisible(true);
  };

  const handleCloseModalSignup = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcome to {" "}
              <span className="text-pink-500">Inst'Inc</span>
            </h1>
            <p className="text-sm md:text-xl">
            Welcome to InstInc, the place where inspiration meets action! We're excited to have you join our thriving community of creators, dreamers, and doers. Whether you're passionate about photography, love sparking discussions on hot topics, or have a business idea itching to take flight, InstInc is your platform. Share your voice, connect with inspiring individuals, and leverage the power of your instincts to make it happen! Here, you'll find the tools and support to turn those "what ifs" into "wow, I did its!"
            </p>

            <p className="text-sm md:text-xxl font-bold">
            New to Inst'Inc?<br />
            Login using credentials: <br />
            email: <span className="text-yellow-500">user@gmail.com</span><br />
            password: <span className="text-yellow-500">user</span><br />
            Or <button onClick={handleOpenModalSignup} className="btn btn-secondary">
                  Signup
                </button>
            </p>
          </div>
        </div>
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src="/media.png"
            className="w-full md:ml-12 rounded-md"
            alt=""
          />
        </div>
      </div>
      <SignupModal isVisible={isModalVisible} onClose={handleCloseModalSignup} />
    </>
  );
}

export default Banner;
