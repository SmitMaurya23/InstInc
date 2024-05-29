import React, { useEffect, useState } from 'react';

function UsernameDisplay() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('selfUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username);
    }
  }, []);

  return (
    <div>
      {username ? username : ''}
    </div>
  );
}

export default UsernameDisplay;
