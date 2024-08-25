import React, { useState } from 'react';
import { SidebarRight, TextalignJustifyleft } from 'iconsax-react';
import ChatForm from './ChatForm';

const ChatWindow = ({ activeTab, toggleDrawer, toggleSidebar }) => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <main className="flex-1 bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
        <TextalignJustifyleft className='lg:hidden' onClick={toggleSidebar} />
        <h1 className="text-xl font-semibold">Chat with {activeTab}</h1>
        <SidebarRight size="32" onClick={toggleDrawer} />
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatForm onNewMessage={handleNewMessage} />
    </main>
  );
};

export default ChatWindow;
