import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";

function Signup({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    // Existing submit logic
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h3>

        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Full Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <FiAlertCircle className="absolute right-3 top-3.5 text-red-500 w-5 h-5" />
            )}
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Name is required
            </p>
          )}
        </div>

        {/* Email Input */}
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

        {/* Username Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your username"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
              {...register("username", { required: true })}
            />
            {errors.username && (
              <FiAlertCircle className="absolute right-3 top-3.5 text-red-500 w-5 h-5" />
            )}
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Username is required
            </p>
          )}
        </div>

        {/* Password Input */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            className="text-pink-500 hover:text-pink-600 font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;