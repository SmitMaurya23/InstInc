import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));

  const onSubmit = async (data) => {
    try {
      if (!selfUser || !selfUser._id) {
        throw new Error('User ID not found');
      }

      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('description', data.description);
      formData.append('author', selfUser._id); // Pass the actual user ID

      const response = await axios.post("http://localhost:4001/post/createPost", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      console.log(response.data);
      toast.success("Post created successfully");
    } catch (error) {
      console.error('Error creating post:', error.response || error.message);
      toast.error("Error creating post");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Create Post</h3>
        <div className="mt-4 space-y-2">
          <span>Description</span>
          <br />
          <input
            type="text"
            placeholder="Enter your description"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <span>Image</span>
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-80 px-3 py-1 border rounded-md outline-none"
          />
        </div>
        <div className="flex justify-around mt-6">
          <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
