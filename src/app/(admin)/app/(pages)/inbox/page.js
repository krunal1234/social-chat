'use client'
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Drawer from './components/Drawer';

const Page = () => {
  const [activeTab, setActiveTab] = useState('facebook');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        activeTab={!activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
        toggleDrawer={toggleDrawer}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={!isSidebarOpen} toggleSidebar={toggleSidebar} />
        <ChatWindow activeTab={activeTab} toggleSidebar={toggleSidebar} toggleDrawer={toggleDrawer}/>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
    </div>
  );
};

export default Page;
