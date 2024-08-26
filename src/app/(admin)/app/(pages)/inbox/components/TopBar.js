import Image from "next/image";
import { useEffect, useState } from "react";

const initialCardData = [
  {
    icon: "/whatsapp.svg",
    id: 1,
    heading: "WhatsApp",
    isActive: false,
  },
  {
    icon: "/instagram.svg",
    id: 2,
    heading: "Instagram",
    isActive: false,
  },
  {
    icon: "/facebook-messenger.svg",
    id: 3,
    heading: "Messenger",
    isActive: false,
  },
  {
    icon: "/twitter.svg",
    id: 4,
    heading: "Twitter",
    isActive: false,
  },
  {
    icon: "/linkedin.svg",
    id: 5,
    heading: "LinkedIn",
    isActive: false,
  },
  {
    icon: "/sms.svg",
    id: 6,
    heading: "SMS",
    isActive: false,
  },
  {
    icon: "/email.svg",
    id: 7,
    heading: "Email",
    isActive: false,
  },
];

const TopBar = ({ activeTab, setActiveTab, toggleSidebar, toggleDrawer }) => {
  const [loading, setLoading] = useState(true);
  const [activeChannels, setActiveChannels] = useState([]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchActiveChannels = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        const userChannels = JSON.parse(data.data[0].channels || '[]');
        const activeChannelIds = new Set(userChannels.map(channel => channel.id));

        const updatedCardData = initialCardData.map(card => ({
          ...card,
          isActive: activeChannelIds.has(card.id),
        }));

        setActiveChannels(updatedCardData.filter(card => card.isActive));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch active channels', error);
        setLoading(false);
      }
    };

    fetchActiveChannels();
  }, []);

  if (loading) {
    return <main className="p-6 h-full flex-wrap flex items-center justify-center"><p>Loading...</p></main>;
  }

  return (
    <header className="text-white p-4 flex items-center">
      <div className="flex space-x-6">
        {activeChannels.map(channel => (
          <button
            key={channel.id}
            className={`p-2 hover:bg-white hover:fill-white bg-gray-300 rounded ${activeTab === channel.heading.toLowerCase() ? 'bg-white' : ''}`}
            onClick={() => handleClick(channel.heading.toLowerCase())}
          >
            <Image src={channel.icon} className="w-8 h-8" alt={channel.heading} />
          </button>
        ))}
      </div>
    </header>
  );
};

export default TopBar;
