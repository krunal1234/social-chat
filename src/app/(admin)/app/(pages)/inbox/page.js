'use client'
import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Drawer from './components/Drawer';

const Page = () => {
  const [activeTab, setActiveTab] = useState('facebook'); // Default to 'facebook'

  return (
    <div className="flex flex-col h-screen">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <ChatWindow activeTab={activeTab} />
        <Drawer />
      </div>
    </div>
  );
};

export default Page;
