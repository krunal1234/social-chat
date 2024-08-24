import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-1/4 bg-white border-r border-gray-300 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        <li
          className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
        >
          <span className="font-semibold">John Doe</span>
          <p className="text-sm text-gray-600">Hello, how are you?</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
