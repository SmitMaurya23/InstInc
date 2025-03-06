import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiX, FiLoader } from 'react-icons/fi';

const EditProfile = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (!selfUser?._id) throw new Error('User ID not found');
      
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('name', data.name || selfUser.name);
      formData.append('username', data.username || selfUser.username);
      formData.append('userID', selfUser._id);

      const response = await axios.post("/api/user/editProfile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem("selfUser", JSON.stringify(response.data.user));
      toast.success("Profile updated successfully");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Edit Profile
        </h3>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img 
              src={preview || selfUser.profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {preview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
          
          <label className="cursor-pointer">
            <div className="flex items-center gap-2 text-pink-500 hover:text-pink-600">
              <FiUploadCloud className="w-5 h-5" />
              <span className="font-medium">Change Photo</span>
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder={`Current: ${selfUser.name}`}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              defaultValue={selfUser.name}
              {...register('name')}
            />
          </div>
        </div>

        {/* Username Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder={`Current: @${selfUser.username}`}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              defaultValue={selfUser.username}
              {...register('username')}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin w-5 h-5" />
                <span>Saving...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;