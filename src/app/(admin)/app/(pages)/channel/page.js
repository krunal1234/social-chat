"use client"
import { useEffect, useState } from "react";

const cardData = [
  {
    icon: <img src="/facebook.svg" width={350}/>,
    id: 1,
    heading: "Facebook",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/instagram.svg" width={350}/>,
    id: 2,
    heading: "Instagram",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/whatsapp.svg" width={350}/>,
    id: 3,
    heading: "WhatsApp",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/facebook-messenger.svg" width={350}/>,
    id: 4,
    heading: "Messenger",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/instagram.svg" width={350}/>,
    id: 5,
    heading: "Twitter",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/instagram.svg" width={350}/>,
    id: 5,
    heading: "LinkedIn",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/instagram.svg" width={350}/>,
    id: 6,
    heading: "SMS",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
  {
    icon: <img src="/instagram.svg" width={350}/>,
    id: 7,
    heading: "Email",
    isActive : false,
    button: <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect</button>
  },
];

const Channel = () => {
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    debugger;
    const getUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET'
        });
        const data = await response.json();
        setProfileData(data.data[0]);
        setLoading(false);

        // Set the selected channels based on profileData
        const userChannels = JSON.parse(data.data[0].channels || '[]');
        setSelectedChannel(userChannels);
      } catch (error) {
        console.error('Failed to check session', error);
        setLoading(false);
      }
    };
    getUser();
    setLoading(false);
  }, []);

  if (loading) {
    return <main className="p-6 h-full flex-wrap flex items-center justify-center"><p>Loading...</p></main>; // Optionally, show a loading indicator
  }

  return (
    <main className="p-6 flex-wrap bg-gray-100">
      <h2 className="text-2xl font-bold">Channel</h2>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="text-center p-4">
                {/* Icon Column */}
                  {card.icon}
                  <h2 className="text-xl mt-4 font-semibold">{card.heading}</h2>
                  <div>{card.button}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Channel;
