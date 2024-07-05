import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      console.log(response.data);
      toast.success("Signup Successfully");
      onClose(); // Close the modal
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      if (error.response) {
        console.log(error);
        toast.error("Error: " + error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Signup</h3>
        <div className="mt-4 space-y-2">
          <span>Name</span>
          <br />
          <input
            type="text"
            placeholder="Enter your fullname"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("name", { required: true })}
          />
          <br />
          {errors.name && (
            <span className="text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* Email */}
        <div className="mt-4 space-y-2">
          <span>Email</span>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("email", { required: true })}
          />
          <br />
          {errors.email && (
            <span className="text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <span>Username</span>
          <br />
          <input
            type="text"
            placeholder="Enter your username"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("username", { required: true })}
          />
          <br />
          {errors.username && (
            <span className="text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* Password */}
        <div className="mt-4 space-y-2">
          <span>Password</span>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("password", { required: true })}
          />
          <br />
          {errors.password && (
            <span className="text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* Button */}
        <div className="flex justify-around mt-4">
          <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
