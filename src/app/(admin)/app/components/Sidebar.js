// components/Sidebar.js

import { ArchiveBook, Monitor } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // Use this hook for path

const Sidebar = () => {
  const pathname = usePathname();  // Use this hook to get the pathname

  // Determine if the current path matches the link path
  const isActive = (path) => pathname === path;

  return (
    <aside className="left-0 w-64 space-y-6 py-7">
      <div className="text-2xl font-bold text-center">
        <Link href="/">Admin Panel</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              href="/app/dashboard"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/dashboard') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Monitor className="mr-3" size={25} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/channel"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/channel') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <ArchiveBook className="mr-3" size={25} />
              <span>Channel</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/social-keys"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/social-keys') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <ArchiveBook className="mr-3" size={25} />
              <span>API Keys</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/inbox"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/inbox') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <ArchiveBook className="mr-3" size={25} />
              <span>Inbox</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
