// components/FacebookForm.js
import { useState } from 'react';
const FacebookForm = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleKeyPress = (event) => {
    if (event.which !== 8 && isNaN(String.fromCharCode(event.which))) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Integrate with Facebook API here
      // For demo purposes, we're just saving the message
      const { data, error } = await supabase
        .from('social_media_data')
        .insert([{ platform: 'Facebook', data: { message } }]);

      if (error) throw error;

      setSuccess(true);
      setMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className='text-4xl mb-5 font-bold'>Facebook Credentials</h1>

        <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div>
                <label>Facebook APP Id : </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='facebookappId'  required onKeyPress={handleKeyPress} />
            </div>
            <div>
                <label>Mobile Number: </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='mobilenumber' required onKeyPress={handleKeyPress} />
            </div>
            <div>
                <label>Phone Number ID: </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='phonenumberid' required onKeyPress={handleKeyPress} />
            </div>
            <div>
                <label>WhatsApp Business Account ID: </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='wabaid' required onKeyPress={handleKeyPress} />
            </div>
            <div>
                <label>Token </label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3' type='text' name='token' required/>
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
  );
};

export default FacebookForm;
