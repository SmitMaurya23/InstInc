import React from "react";
import EditProfile from "./EditProfile";
import { FiX } from "react-icons/fi";

const EditProfileModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-700 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-8 -right-2 text-white hover:text-gray-200 p-2 transition-colors"
          aria-label="Close"
        >
          <FiX className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          <EditProfile onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;