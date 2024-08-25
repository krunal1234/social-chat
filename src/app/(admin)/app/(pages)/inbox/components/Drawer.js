import { CloseCircle } from 'iconsax-react';
import React from 'react';

const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <aside className={`${ isOpen ? '' : 'hidden' } absolute lg:relative lg:top-0 top-16 right-0 h-full bg-white border-l border-gray-300 p-4 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-80 lg:relative lg:w-1/4`}>
      <button onClick={toggleDrawer} className="absolute top-4 right-4">
        <CloseCircle/>
      </button>
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" id="phone" name="phone" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
      </form>
    </aside>
  );
};

export default Drawer;
