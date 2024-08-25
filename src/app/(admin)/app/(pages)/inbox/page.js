'use client'
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Drawer from './components/Drawer';

const Page = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleSelectChat = (mobileNumber) => {
    setActiveChat(mobileNumber);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        activeTab={!activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
        toggleDrawer={toggleDrawer}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onSelectChat={handleSelectChat} />
        <ChatWindow activeChat={activeChat} toggleSidebar={toggleSidebar} toggleDrawer={toggleDrawer} />
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
};

export default Page;
