import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { FiAlertCircle } from "react-icons/fi";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Login = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    
    await axios
      .post(`${BACKEND_URL}/user/login`, userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Logged in Successfully");
          localStorage.setItem("selfUser", JSON.stringify(res.data.user));
          setAuthUser(res.data.user);
          onClose();
          setTimeout(() => {
            navigate("/");
            window.location.reload();
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
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h3>

        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <FiAlertCircle className="absolute right-3 top-3.5 text-red-500 w-5 h-5" />
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Email is required
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-pink-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Password is required
            </p>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-pink-500 hover:text-pink-600 font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-pink-500 hover:text-pink-600 font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;