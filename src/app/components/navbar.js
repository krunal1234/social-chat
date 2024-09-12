"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowSquareRight } from 'iconsax-react';
import { createClient } from '../../../utils/supabase/client';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const supabase = new createClient();
      const data = await supabase.auth.getUser();
      setUser(data.data.user?.aud);
    }
    getUserData();
  }, []);

  // Toggle the drawer state
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prevState => !prevState);
  }, []);

  return (
    <div>
      <nav className="p-4 bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-dark text-2xl font-bold">
            <Link href="/">Alinbox</Link>
          </div>
          <button
            className="text-dark lg:hidden"
            onClick={toggleDrawer}
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
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/about" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/contact" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            {
            user === "authenticated" ? (
              <>
                <Link href="/app/dashboard" className="text-dark flex hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium"><span className='pr-2'>Admin</span> <ArrowSquareRight size={20}/></Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link href="/register" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer for mobile and tablet */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 ${isDrawerOpen ? 'right-0' : 'right-full'}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div className={`w-64 bg-white text-dark h-full transform transition-transform  ${isDrawerOpen ? '-translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end p-4">
            <div className="text-dark text-2xl px-3 flex-1 font-bold">
              <Link href="/">Brand</Link>
            </div>
            <button
              className="text-dark"
              onClick={() => setIsDrawerOpen(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/about" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/services" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Services</Link>
            <Link href="/contact" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
             {
            user === "authenticated" ? (
              <>
                <Link href="/app/dashboard" className="text-dark flex hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium"><span className='pr-2'>Admin</span> <ArrowSquareRight /></Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link href="/register" className="text-dark hover:bg-cyan-300 hover:text-dark px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
