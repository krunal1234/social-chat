"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TopBar = ({ onSidebarToggle }) => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState("");
  
  useEffect(() => {
    const getUser = async () => {
      try {
      } catch (error) {
          console.error('Failed to check session', error);
      }
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    const response = await fetch('/api/login', {
        method: 'DELETE'
    });

    // Ensure the response is valid and parse JSON
    if (response.ok) {
      router.push(`/login`, "success");
    }else {
        toast.error(response.message);
    }
    
    return response.json();
  }

  return (
    <div className="bg-cyan-400 text-white p-4 flex justify-end flex-end items-center">
      <div className='flex-1'>
      <button
        onClick={onSidebarToggle}
        className="text-white focus:outline-none flex-1"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center text-white focus:outline-none"
        >
          <span className="mr-2">{profile.name}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 right-0 mt-2 bg-white w-48 rounded-md shadow-lg">
            <Link href="/app/profile" className="block px-4 py-2 text-black hover:bg-cyan-400 hover:text-white">Profile</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-cyan-400 hover:text-white">Logout</button>
          </div> 
        )}
      </div>
    </div>
  );
};

export default TopBar;
