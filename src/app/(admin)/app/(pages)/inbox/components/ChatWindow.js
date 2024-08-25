import React, { useState, useEffect } from 'react';
import { SidebarRight, TextalignJustifyleft } from 'iconsax-react';
import ChatForm from './ChatForm';

const ChatWindow = ({ activeChat, toggleDrawer, toggleSidebar }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat) {
        try {
          const response = await fetch(`/api/messageList/whatsapp?mobileNumber=${activeChat}`);
          const data = await response.json();
          
          // Ensure the response format is correct
          if (data.data && Array.isArray(data.data)) {
            let windowChat = data.data.filter(chat => chat.MobileNumber === activeChat);
            setMessages(windowChat);
          } else {
            console.error('Unexpected response format:', data);
          }
        } catch (error) {
          console.error('Failed to fetch messages', error);
        }
      } else {
        setMessages([]); // Clear messages when no active chat
      }
    };
  
    fetchMessages();
  }, [activeChat]);  

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <main className="flex-1 bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
        <TextalignJustifyleft className='lg:hidden' onClick={toggleSidebar} />
        <h1 className="text-xl font-semibold">Chat with {activeChat}</h1>
        <SidebarRight size="32" onClick={toggleDrawer} />
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
        {messages.length === 0 ? (
            <p>No messages</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.SentFromWhatsapp ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`p-4 rounded-lg max-w-xs ${
                    msg.SentFromWhatsapp ? 'bg-gray-200' : 'bg-blue-500 text-white'
                  }`}
                >
                  <p>{msg.generatedmessages}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ChatForm onNewMessage={handleNewMessage} />
    </main>
  );
};

export default ChatWindow;
