import { ArchiveBook, Cloud, DirectInbox, Monitor, ArrowDown2, Book, OceanProtocol, Shuffle, Whatsapp, Instagram, ReceiptItem } from 'iconsax-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const isSubmenuActive = (subPaths) => subPaths.some(path => pathname.startsWith(path));

  const toggleSubmenu = () => setSubmenuOpen(!isSubmenuOpen);

  return (
    <aside className="left-0 w-64 space-y-6 py-7">
      <div className="text-2xl font-bold text-center">
        <Link href="/">Alinbox</Link>
      </div>
      <nav>
        <ul className='p-0'>
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
          {/* <li>
            <Link
              href="/app/channel"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/channel') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <ArchiveBook className="mr-3" size={25} />
              <span>Channel</span>
            </Link>
          </li> */}
          <li>
            <Link
              href="/app/contacts"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/social-keys') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Book className="mr-3" size={25} />
              <span>Contacts</span>
            </Link>
          </li>
          <li className={`relative ${isSubmenuActive(['/app/campaigns/whatsapp', '/app/campaigns/instagram']) ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'}`}>
            <button
              onClick={toggleSubmenu}
              className={`flex items-center w-full p-3 text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${isActive('/app/campaigns') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'} focus:outline-none`}
            >
              <OceanProtocol className="mr-3" size={25} />
              <span>Campaigns</span>
              <ArrowDown2 className={`ml-auto transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {/* Submenu */}
            <ul className={`pl-6 mt-2 space-y-2 bg-white border border-gray-200 rounded-lg ${isSubmenuOpen ? 'block' : 'hidden'}`}>
              <li>
                <Link
                  href="/app/campaigns/whatsapp"
                  className={`flex p-3 text-lg font-bold hover:text-cyan-500 ${isActive('/app/campaigns/whatsapp') ? 'text-cyan-500' : 'text-black'}`}
                >
              <Whatsapp className="mr-3" size={25} />
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/app/campaigns/instagram"
                  className={`flex p-3 text-lg font-bold hover:text-cyan-500 ${isActive('/app/campaigns/instagram') ? 'text-cyan-500' : 'text-black'}`}
                >
              <Instagram className="mr-3" size={25} />
                  Instagram
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/app/inbox"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/inbox') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <DirectInbox className="mr-3" size={25} />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/social-keys"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/social-keys') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Shuffle className="mr-3" size={25} />
              <span>Flows</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/social-keys"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/social-keys') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <ReceiptItem className="mr-3" size={25} />
              <span>Templates</span>
            </Link>
          </li>
          <li>
            <Link
              href="/app/social-keys"
              className={`flex p-3 items-center text-xl font-bold hover:text-cyan-500 hover:border-r-4 hover:border-cyan-500 ${
                isActive('/app/social-keys') ? 'border-r-4 border-cyan-500 text-cyan-500' : 'text-black'
              }`}
            >
              <Cloud className="mr-3" size={25} />
              <span>API Keys</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
