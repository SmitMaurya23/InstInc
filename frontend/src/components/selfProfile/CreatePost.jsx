import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiAlertCircle, FiUploadCloud, FiX, FiLoader } from 'react-icons/fi';

const CreatePost = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      if (!selfUser?._id) throw new Error('User ID not found');
      if (!image) {
        toast.error('Please select an image');
        return;
      }

      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', data.description);
      formData.append('author', selfUser._id);

      await axios.post("/api/post/createPost", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Post created successfully");
      onClose();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || "Error creating post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">
          Create New Post
        </h3>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Description</label>
          <div className="relative">
            <textarea
              placeholder="What's on your mind?"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } bg-slate-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none`}
              rows="3"
              {...register('description', { required: true })}
            />
            {errors.description && (
              <FiAlertCircle className="absolute right-3 top-3.5 text-red-500 w-5 h-5" />
            )}
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Description is required
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Image</label>
          <div className="relative">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 transition-colors cursor-pointer bg-slate-800">
              {preview ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <FiX className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                <>
                  <FiUploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-gray-400">Click to upload</span>
                </>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>
          {!image && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <FiAlertCircle className="w-4 h-4" />
              Image is required
            </p>
          )}
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
                <span>Creating Post...</span>
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;