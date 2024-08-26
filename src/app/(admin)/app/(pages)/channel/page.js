"use client"
import { useEffect, useState } from "react";
import FacebookConnect from "../social-connect/FacebookConnect";
import { useRouter } from "next/navigation";
import Image from "next/image";
// Import other connect components similarly

const initialCardData = [
  {
    icon: <Image src="/whatsapp.svg" alt="whatsapp-icon" width={350}  height={350}/>,
    id: 1,
    heading: "WhatsApp",
    isActive: false,
    handler: 'WhatsApp'
  },
  {
    icon: <Image src={"/instagram.svg"} alt="instagram-icon" width={350}  height={350}/>,
    id: 2,
    heading: "Instagram",
    isActive: false,
    handler: 'Instagram'
  },
  {
    icon: <Image src={"/facebook-messenger.svg"} alt="messanger-icon" width={350}  height={350}/>,
    id: 3,
    heading: "Messenger",
    isActive: false,
    handler: 'Messenger'
  },
  {
    icon: <Image src={"/twitter.svg"}  alt="twitter-icon" width={350}  height={350}/>,
    id: 4,
    heading: "Twitter",
    isActive: false,
    handler: 'Twitter'
  },
  {
    icon: <Image src={"/linkedin.svg"}  alt="linkedin-icon" width={350}  height={350}/>,
    id: 5,
    heading: "LinkedIn",
    isActive: false,
    handler: 'LinkedIn'
  },
  {
    icon: <Image src={"/sms.svg"} alt="sms-icon" width={350}  height={350}/>,
    id: 6,
    heading: "SMS",
    isActive: false,
    handler: 'SMS'
  },
  {
    icon: <Image src={"/email.svg"} alt="email-icon" width={350}  height={350}/>,
    id: 7,
    heading: "Email",
    isActive: false,
    handler: 'Email'
  },
];

const Channel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState(initialCardData);
  const [activeConnectComponent, setActiveConnectComponent] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET'
        });
        const data = await response.json();
        const userChannels = JSON.parse(data.data[0].channels || '[]');
        
        // Map user channels to ids for easier lookup
        const activeChannelIds = new Set(userChannels.map(channel => channel.id));

        // Update cardData with isActive based on API response
        const updatedCardData = initialCardData.map(card => ({
          ...card,
          isActive: activeChannelIds.has(card.id),
        }));
        
        setCardData(updatedCardData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to check session', error);
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  const handleConnect = (platform) => {
    switch (platform) {
      case 'WhatsApp':
        setActiveConnectComponent(<FacebookConnect />);
        break;
      case 'Instagram':
        // setActiveConnectComponent(<InstagramConnect />);
        break;
      case 'Messenger':
        router.push(`/app/social-keys/Whatsapp`, "success");
        // setActiveConnectComponent(<MessengerConnect />);
        break;
      case 'Twitter':
        router.push(`/app/social-keys/Twitter`, "success");
        // setActiveConnectComponent(<TwitterConnect />);
        break;
      case 'LinkedIn':
        router.push(`/app/social-keys/LinkedIn`, "success");
        // setActiveConnectComponent(<LinkedInConnect />);
        break;
      case 'SMS':
        router.push(`/app/social-keys/Whatsapp`, "success");
        // setActiveConnectComponent(<SMSConnect />);
        break;
      case 'Email':
        router.push(`/app/social-keys/Whatsapp`, "success");
        // setActiveConnectComponent(<EmailConnect />);
        break;
      default:
        setActiveConnectComponent(null);
    }
  };

  if (loading) {
    return <main className="p-6 h-full flex-wrap flex items-center justify-center"><p>Loading...</p></main>;
  }

  return (
    <main className="p-6 flex-wrap">
      <h2 className="text-2xl font-bold">Channel</h2>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardData.filter(card => card.isActive).map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="text-center p-4">
                {card.icon}
                <h2 className="text-xl mt-4 font-semibold">{card.heading}</h2>
                <div>
                  <button
                    className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleConnect(card.handler)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {activeConnectComponent}
    </main>
  );
};

export default Channel;
