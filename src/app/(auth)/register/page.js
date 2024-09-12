"use client";

import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from 'react-select'

const channels = [
  { id: 1, value: 1, label: "WhatsApp" },
  { id: 2, value: 2, label: "Instagram" },
  { id: 3, value: 3, label: "Messenger" },
  { id: 4, value: 4, label: "Twitter" },
  { id: 5, value: 5, label: "LinkedIn" },
  { id: 6, value: 6, label: "SMS" },
  { id: 7, value: 7, label: "Email" }
];

async function registerUser(formData) {
  const response = await fetch('/api/register', {
      method: 'POST',
      body: formData,
  });
  
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  
  return response.json();
}

export default function Register() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [selectedChannel, setSelectedChannel] = useState([]);

    const handleSelectChange = (selectedOptions) => {
      setSelectedChannel(selectedOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Append each selected channel to FormData
        selectedChannel.forEach(channel => channel.value);
        formData.append('channels', JSON.stringify(selectedChannel));

        try {
          const result = await registerUser(formData);
          if(result?.message){
            setMessage(result?.message);
          } else {
              router.push(`/app/dashboard`, "success");
          }
        } catch (error) {
            setMessage('An unexpected error occurred');
        }
    };

    return (
      <div className="bg-cyan-400 h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-between p-8">
        <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-md mx-auto" onSubmit={handleSubmit}>
            <div className="text-3xl md:text-4xl lg:text-5xl text-center mb-8 font-semibold">
              Create Your Account
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center">
              <div className="text-left">
                <div className="mb-3">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input type="tel" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
              </div>
              <div className="text-left">
                <div className="mb-3">
                    <label htmlFor="channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active Channel</label>
                    <Select
                      isMulti
                      options={channels}
                      onChange={handleSelectChange}
                      placeholder="Select channels..."
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <textarea name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
              </div>
            </div>
            <div className="text-center">
              {message && <div className="text-red-500 mb-4">{message}</div>}
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
}
