"use client"
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function RootLayout({ children }) {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarHide = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen">
    <div className={`fixed bg-white inset-y-0 left-0 z-20 transition-transform duration-300 shadow-xl ease-in-out ${isSidebarOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}`}>
      <Sidebar />
    </div>
    <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 flex flex-col h-full bg-gray-100`}>
      <TopBar onSidebarToggle={handleSidebarToggle} />
      {children}
      <Footer />
    </div>
  </div>
  );
}
