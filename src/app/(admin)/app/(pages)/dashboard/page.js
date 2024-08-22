"use client"

import { Box, Calendar, Chart, User } from "iconsax-react";


const Dashboard = ({props}) => {

  const cardData = [
    {
      icon: <User size={50} className="text-blue-500 text-3xl" />,
      heading: "Users",
      count: "1,234",
    },
    {
      icon: <Calendar size={50} className="text-green-500 text-3xl" />,
      heading: "Events",
      count: "56",
    },
    {
      icon: <Box size={50} className="text-red-500 text-3xl" />,
      heading: "Products",
      count: "789",
    },
    {
      icon: <Chart size={50} className="text-yellow-500 text-3xl" />,
      heading: "Revenue",
      count: "$12,345",
    },
  ];
  
  return (
    <main className="p-6 h-full flex-wrap">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex items-center p-4">
                {/* Icon Column */}
                <div className="flex-shrink-0 p-4">
                  {card.icon}
                </div>
                {/* Content Column */}
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">{card.heading}</h2>
                  <p className="text-gray-600 text-lg">{card.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
