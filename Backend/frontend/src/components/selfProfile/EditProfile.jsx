import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';


const EditProfile = () => {
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
      formData.append('name', data.name);
      formData.append('username', data.username);
      formData.append('userID', selfUser._id);

      

      const response = await axios.post("/api/user/editProfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTimeout(() => {
        window.location.reload();
        localStorage.setItem("selfUser", JSON.stringify(response.data.user));
      }, 1000);

      console.log(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
      toast.error("Error updating profile");
    }
  };

  return (
    <div>
        <div className="mb-4">
              <img src={selfUser.profileImage} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
            </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-lg">Edit Profile</h3>
        <div className="mt-4 space-y-2">
          <span>New Profile Image</span>
          <br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-80 px-3 py-1 border rounded-md outline-none"
          />
        </div>
        <div className="mt-4 space-y-2">
          <span>New Name</span>
          <br />
          <input
            type="text"
            placeholder="Enter your new name"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <span>New UserName</span>
          <br />
          <input
            type="text"
            placeholder="Enter your new username"
            className="w-80 px-3 py-1 border rounded-md outline-none"
            {...register('username', { required: true })}
          />
          {errors.description && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>
        
        <div className="flex justify-around mt-6">
          <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
