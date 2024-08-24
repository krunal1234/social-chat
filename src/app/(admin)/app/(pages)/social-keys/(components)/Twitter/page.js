'use client'
// components/Twitter.js
import { useState } from 'react';


const Twitter = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await twitterClient.post("statuses/update", { status });
      const { data, error } = await supabase
        .from('social_media_data')
        .insert([{ platform: 'Twitter', data: { status } }]);

      if (error) throw error;

      setSuccess(true);
      setStatus('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-6 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Twitter API</label>
          <textarea
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Status submitted successfully!</p>}
      </form>
    </div>
  );
};

export default Twitter;
