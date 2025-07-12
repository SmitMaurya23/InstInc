// src/components/SearchBar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/user/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);
  const navigate = useNavigate();
  const handlePostClick = (userId) => {
    navigate('/OtherProfile', { state: { userId } });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-2 w-full"
        placeholder="Search for users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <div className="absolute left-0 right-0 mt-1 bg-slate-800 p-2">Loading...</div>}
      {results.length > 0 && (

        <div className="absolute left-0 right-0 mt-1 bg-slate-800  border border-gray-300 rounded-lg z-10">
          {results.map((user) => (
             <div onClick={() => handlePostClick(user._id)} className="flex items-center cursor-pointer">
            <div key={user._id} className="flex items-center p-2 border-b border-gray-200 last:border-b-0">
              <img src={user.profileImage} alt={user.username} className="h-8 w-8 rounded-full mr-2" />
              <div>{user.username}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
