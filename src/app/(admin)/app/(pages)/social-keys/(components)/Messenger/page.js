'use client'
// components/Messenger.js
import { useEffect, useState } from 'react';

const Messenger = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [MessengerData, setMessengerData] = useState([]);

  
  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      try {
        
        setLoading(true);
        const response = await fetch('/api/socialapi/messenger', {
          method: 'GET',
        });
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        const data = await response.json();
        setMessengerData(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to check session', error);
        setLoading(false);
      }
    };
    getUser();
    
  }, []);
  
  const handleKeyPress = (event) => {
    if (event.which !== 8 && isNaN(String.fromCharCode(event.which))) {
      event.preventDefault();
    }
    event.currentTarget.value = removeSpaces(event.currentTarget.value);
  };

  const removeSpaces = (phoneNumber) => {
    return phoneNumber.replace(/\s+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("platform","Messenger");
    formData.append("platform_id","1");
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/socialapi/messenger', {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      return response.json();

      setSuccess(true);
      setMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessengerData({ ...MessengerData, [name]: value });
  };

  if (loading) {
    return <main className="p-6 h-full flex-wrap flex items-center justify-center"><p>Loading...</p></main>;
  }

  return (
    <div className="m-6 space-y-8">
      <form  onSubmit={handleSubmit} className="space-y-4">
        <h1 className='text-4xl mb-5 font-bold'>Messenger Credentials</h1>
        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div>
                <label>Access Token</label>
                <input value={MessengerData ? MessengerData.access_token : ""} onChange={handleInputChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='access_token'  required onKeyUp={handleKeyPress} />
            </div>
            <div className='text-center'>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 mt-6 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Message submitted successfully!</p>}
      </form>
      </div>
  );
};

export default Messenger;
