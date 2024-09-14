'use client';
import Image from 'next/image';
import React, { useState, Suspense, lazy } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  const handleSelectChat = (mobileNumber) => {
    setActiveChat(mobileNumber);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  // Dynamically import components based on the activeTab
  const TopBar = lazy(() => import(`./TopBar`));
  const Sidebar = lazy(() => import(`./${activeTab}/components/Sidebar`));
  const ChatWindow = lazy(() => import(`./${activeTab}/components/ChatWindow`));
  const Drawer = lazy(() => import(`./${activeTab}/components/Drawer`));

  if (loading) {
    return <main className="p-6 h-screen flex-wrap flex items-center justify-center"><Image src='/loading.gif' width={40} height={40} alt="Loading"/></main>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Suspense fallback={<div className="p-6 h-full flex-wrap flex items-center justify-center">Loading...</div>}>
        <TopBar
          activeTab={activeTab}
          setLoading={setLoading}
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
          toggleDrawer={toggleDrawer}
        />
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar 
            activeChat={activeChat}
            activeTab={activeTab}
            setLoading={setLoading}
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            onSelectChat={handleSelectChat}
          />
          <ChatWindow 
            activeChat={activeChat}
            activeTab={activeTab}
            setLoading={setLoading}
            toggleSidebar={toggleSidebar}
            toggleDrawer={toggleDrawer}
          />
          <Drawer 
            activeChat={activeChat}
            activeTab={activeTab}
            setLoading={setLoading}
            isOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
            onSelectChat={handleSelectChat}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
