'use client'
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Drawer from './components/Drawer';

const Page = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeTab, setActiveTab] = useState("instagram");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleSelectChat = (mobileNumber) => {
    setActiveChat(mobileNumber);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        activeTab={activeTab} // No need for negation here
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
        toggleDrawer={toggleDrawer}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeChat={activeChat} activeTab={activeTab} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelectChat={handleSelectChat} />
        <ChatWindow activeChat={activeChat} activeTab={activeTab} toggleSidebar={toggleSidebar} toggleDrawer={toggleDrawer} />
        <Drawer activeChat={activeChat} activeTab={activeTab} isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} onSelectChat={handleSelectChat}/>
      </div>
    </div>
  );
};

export default Page;
