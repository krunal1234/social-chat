import React, { useState, useEffect, useRef } from 'react';
import { Receipt, SidebarRight, TextalignJustifyleft } from 'iconsax-react';
import ChatForm from './ChatForm';
import { createClient } from '../../../../../../../../utils/supabase/client';

const ChatWindow = ({ activeChat, activeTab, toggleDrawer, toggleSidebar }) => {
  const [messages, setMessages] = useState([]);
  const [fullName, setFullName] = useState(null);
  const [instagramChatDetails, setInstagramChatDetails] = useState({ SenderId : "", RecipientId : ""  , fullName: ''});

  // Reference to the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat) {
        try {
          const response = await fetch(`/api/messageList/instagram`);
          const data = await response.json();
          if (data.data && Array.isArray(data.data)) {
            let windowChat = data.data.filter(chat => chat.ChatFrom === activeChat);
            setMessages(windowChat);
            setFullName(data.data.filter(chat => chat.Fullname != null)[0].Fullname);
            // Extracting FromNumber and MobileNumber from the first message
            if (windowChat.length > 0) {
              setInstagramChatDetails({
                RecipientId: windowChat[0].RecipientId, 
                SenderId: windowChat[0].SenderId,
                Fullname: windowChat[0].Fullname
              });
            }
          } else {
            console.error('Unexpected response format:', data);
          }
        } catch (error) {
          console.error('Failed to fetch messages', error);
        }
      } else {
        setMessages([]); // Clear messages when no active chat
        setInstagramChatDetails({ SenderId : "", RecipientId : ""  , fullName: ''});
      }
    };

    fetchMessages();

    const supabase = createClient();

    // Create a new channel for real-time subscriptions
    const channel = supabase
      .channel('public:InstagramMessageList')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'InstagramMessageList' }, payload => {
        handleNewMessage(payload.new);
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChat]);

  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="flex-1 bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
        <TextalignJustifyleft className="lg:hidden" onClick={toggleSidebar} />
        <div>
          <h1 className="text-2xl font-bold">{fullName}</h1>
          <h3 className="text-xl font-semibold">{activeChat}</h3>
        </div>
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
                className={`flex ${msg.SentFromInstagram && msg.ChatFrom == msg.RecipientId  ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`p-4 rounded-lg max-w-xs ${msg.SentFromInstagram ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                >
                  {msg.Message}
                </div>
              </div>
            ))
          )}
          {/* Dummy div to serve as scroll target */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {activeTab && messages?.length !== 0 && (
        <ChatForm 
          onNewMessage={handleNewMessage} 
          activeTab={activeTab}
          SenderId={instagramChatDetails?.SenderId} 
          RecipientId={instagramChatDetails?.RecipientId} 
          Fullname={instagramChatDetails?.Fullname}
        />
      )}
    </main>
  );
};

export default ChatWindow;
