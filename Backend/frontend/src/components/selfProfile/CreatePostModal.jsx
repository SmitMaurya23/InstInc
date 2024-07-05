import React from "react";
import CreatePost from "./CreatePost";

const CreatePostModal = ({ isVisible, onClose, userId }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-lg p-6 w-1/2">
        <button className="float-right text-white" onClick={onClose}>X</button>
        <CreatePost userId={userId} onClose={onClose} />
      </div>
    </div>
  );
};

export default CreatePostModal;
