import React, { useEffect, useState } from 'react';

function ProfileImageDisplay() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('selfUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setProfile(parsedUser.profileImage);
    }
  }, []);

  return (
    <div>
      {profile ? (
        <img src={profile} alt="Profile" className="w-16 h-16 rounded-full" />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ProfileImageDisplay;
