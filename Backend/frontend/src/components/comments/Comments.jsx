import React, { useState, useEffect } from 'react';
import ViewComment from './ViewComment';


function Comments({ post }) {
  const selfUser = JSON.parse(localStorage.getItem("selfUser"));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post && post.comments && post.comments.length > 0) {
      setComments(post.comments);
    } else {
      setComments([]);
    }
    
  }, [post]);

  return (
    <div className="mx-10 my-10">
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map(comment => (
          <div key={comment._id} className="flex items-center mb-4">
            <ViewComment comment={comment} />
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;
