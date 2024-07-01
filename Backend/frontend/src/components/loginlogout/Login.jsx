import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

const Login = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    
    await axios
      .post("/api/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully");
          localStorage.setItem("selfUser", JSON.stringify(res.data.user));
          setAuthUser(res.data.user);
          onClose(); // Close the modal
          setTimeout(() => {
            navigate("/");
            window.location.reload(); // Reload the page
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Login</h3>
        <div className="mt-4 space-y-2">
          <span>Email</span>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <span>Password</span>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex justify-around mt-6">
          <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
