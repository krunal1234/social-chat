import React from 'react';

const ChatWindow = ({ activeTab }) => {
  return (
    <main className="flex-1 bg-white p-4 overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Display chat messages based on activeTab */}
            {/* Example static messages; replace with dynamic content */}
            <div className="flex">
              <div className="bg-gray-200 p-4 rounded-lg max-w-xs">
                <p>Welcome to {activeTab} chat!</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs">
                <p>Hello! How can I assist you with {activeTab}?</p>
              </div>
            </div>
            {/* Add more chat bubbles here */}
          </div>
        </div>
        <form className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatWindow;
