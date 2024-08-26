import React, { useEffect, useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, onSelectChat }) => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getMessageList = async () => {
      try {
        const response = await fetch('/api/messageList/whatsapp');
        const data = await response.json();

        // Group chats by MobileNumber
        const groupedChats = data.data.reduce((acc, chat) => {
          if (!acc[chat.MobileNumber]) {
            acc[chat.MobileNumber] = [];
          }
          acc[chat.MobileNumber].push(chat);
          return acc;
        }, {});

        // Convert groupedChats to an array of objects
        const formattedChats = Object.keys(groupedChats).map(mobileNumber => ({
          mobileNumber,
          chats: groupedChats[mobileNumber]
        }));

        setChats(formattedChats);
      } catch (error) {
        console.error('Failed to fetch message list', error);
      } finally {
        setLoading(false);
      }
    };
    getMessageList();
  }, []);

  return (
    <aside className={`${isOpen ? '' : 'hidden'} absolute lg:relative lg:top-0 top-16 left-0 h-full bg-white border-r border-gray-300 p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80 lg:w-1/4`}>
      <button onClick={toggleSidebar} className="lg:hidden absolute top-4 right-4">
        <span className="sr-only">Close Sidebar</span>
      </button>
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          chats.map(({ mobileNumber, chats }) => {
            const lastChat = chats[chats.length - 1];
            const fullName = lastChat?.Fullname || 'Unknown';
            const lastMessage = lastChat?.generatedmessages || 'No messages';

            return (
              <li 
                key={mobileNumber} 
                className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" 
                onClick={() => onSelectChat(mobileNumber)}
              >
                <span className="font-semibold">{fullName}</span>
                <p className="text-sm text-gray-600">
                  {lastMessage}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
