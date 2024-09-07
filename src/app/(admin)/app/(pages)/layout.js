"use client"
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const checkViewport = () => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    setIsSidebarOpen(!isMobileOrTablet); // Sidebar is closed on mobile and tablet by default
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarHide = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    checkViewport(); // Initial check
    window.addEventListener('resize', checkViewport); // Update on resize

    return () => {
      window.removeEventListener('resize', checkViewport); // Cleanup
    };
  }, []);

  
  return (
    <div className="h-screen">
      <div className={`fixed bg-white inset-y-0 left-0 z-20 transition-transform duration-300 shadow-xl ease-in-out ${isSidebarOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}`}>
        <Sidebar/>
      </div>
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 flex flex-col`}>
        <TopBar onSidebarToggle={handleSidebarToggle} />
        <div className='min-h-screen bg-gray-100'>
        {children}
        </div>
        <Footer/>
      </div>
    </div>
  );
}
