import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`${ isOpen ? '' : 'hidden' } absolute lg:relative lg:top-0 top-16 left-0 h-full bg-white border-r border-gray-300 p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80 lg:relative lg:w-1/4`}>
      <button onClick={toggleSidebar} className="lg:hidden absolute top-4 right-4">
        <span className="sr-only">Close Sidebar</span>
      </button>
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        <li className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
          <span className="font-semibold">John Doe</span>
          <p className="text-sm text-gray-600">Hello, how are you?</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
