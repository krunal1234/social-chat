import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '../../../../../../../../utils/supabase/client';

const Sidebar = ({ isOpen, activeChat, activeTab, toggleSidebar, onSelectChat }) => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const supabase = createClient();

  const fetchChats = useCallback(async () => {
    try {
      if (activeTab) {
        const response = await fetch('/api/messageList/instagram');
        const data = await response.json();
        // Group chats by MobileNumber
        const groupedChats = data.data.reduce((acc, chat) => {
          if (!acc[chat.ChatFrom]) {
            acc[chat.ChatFrom] = [];
          }
          acc[chat.ChatFrom].push(chat);
          return acc;
        }, {});

        // Convert groupedChats to an array of objects
        const formattedChats = Object.keys(groupedChats).map(SenderId => ({
          SenderId,
          chats: groupedChats[SenderId]
        }));

        setChats(formattedChats);
      }
    } catch (error) {
      console.error('Failed to fetch message list', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchChats();

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
  }, [fetchChats, supabase]);

  const handleNewMessage = (newMessage) => {
    setChats(prevChats => {
      const mobileNumber = newMessage.MobileNumber;
      const updatedChats = prevChats.map(chatGroup => {
        if (chatGroup.SenderId === mobileNumber) {
          return {
            ...chatGroup,
            chats: [...chatGroup.chats, newMessage]
          };
        }
        return chatGroup;
      });

      if (!updatedChats.some(chatGroup => chatGroup.SenderId === mobileNumber)) {
        updatedChats.push({
          SenderId: mobileNumber,
          chats: [newMessage]
        });
      }

      return updatedChats;
    });
  };

  return (
    <aside className={`${isOpen ? '' : 'hidden'} absolute lg:relative lg:top-0 top-34 left-0 h-full bg-white border-r border-gray-300 p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80 lg:w-1/4`}>
      <button onClick={toggleSidebar} className="lg:hidden absolute top-4 right-4">
        <span className="sr-only">Close Sidebar</span>
      </button>
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          <>
            {activeTab === "instagram" && (
              chats.map(({ SenderId, chats }) => {
                const lastChat = chats[chats.length - 1];
                const fullName = lastChat?.Fullname || 'Unknown';
                const lastMessage = lastChat?.Message || 'No messages';

                return (
                  <li 
                    key={SenderId} 
                    className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => onSelectChat(SenderId)}
                  >
                    <span className="font-semibold">{fullName}</span>
                    <p className="text-sm text-gray-600">
                      {lastMessage}
                    </p>
                  </li>
                );
              })
            )}
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;