"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const channels = [
  { id: 1,value: 1, label: "Facebook" },
  { id: 2,value: 2, label: "Instagram" },
  { id: 3,value: 3, label: "Twitter" },
  { id: 4,value: 4, label: "LinkedIn" },
  { id: 5,value: 5, label: "WhatsApp" },
  { id: 6,value: 6, label: "SMS" },
  { id: 7,value: 7, label: "Email" }
];


async function profileUpdate(formData) {
  debugger;
  const response = await fetch('/api/user', {
      method: 'PUT',
      body: formData,
  });
  
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  
  return response.json();
}

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({ name: '' , phone: '', address: '', channels : channels });
  const [loading, setLoading] = useState(true); // Add loading state
  const [message, setMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    selectedChannel.forEach(channel => channel.value);
    formData.append('channels', JSON.stringify(selectedChannel));

    try {
      const result = await profileUpdate(formData);
      if(result?.message){
        setMessage(result?.message);
      } else {
          router.push(`/app/dashboard`, "success");
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedChannel(selectedOptions);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET'
        });
        const data = await response.json();
        console.log(profileData);
        setProfileData(data.data[0]);
        setLoading(false); 
      } catch (error) {
        console.error('Failed to check session', error);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading) {
    return <main className="p-6 h-full flex-wrap flex items-center justify-center"><p>Loading...</p></main>; // Optionally, show a loading indicator
  }
  return (
    <main className="p-6 h-full flex-wrap">
      <h2 className="text-2xl font-bold">Profile</h2>
      <form className="mt-4 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            name="name"
            value={profileData ? profileData.name : ""}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
          <input
            type="phone"
            name="phone"
            value={profileData ? profileData.phone : ""}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <Select
              isMulti
              options={profileData && profileData.channels && JSON.parse(profileData.channels).length? profileData.channels : channels}
              onChange={handleSelectChange}
              placeholder="Select channels..."
            />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
          <textarea
            name="address"
            defaultValue={profileData ? profileData.address : ""}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
          </textarea>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </main>
  );
};

export default Profile;
