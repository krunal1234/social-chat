// components/LinkedInForm.js
import { useState } from 'react';

const LinkedInForm = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await fetch('https://api.linkedin.com/v2/shares', {
        content: { contentEntities: [{ entityLocation: 'https://your-url.com' }], title: 'Your Post Title' },
        distribution: { linkedInDistributionTarget: {} },
        owner: 'urn:li:person:YOUR_PERSON_URN',
        text: { text: message }
      }, {
        headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN`, 'Content-Type': 'application/json' }
      });

      const { data, error } = await supabase
        .from('social_media_data')
        .insert([{ platform: 'LinkedIn', data: { message } }]);

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
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">LinkedIn API</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
      {success && <p className="text-green-500">Message submitted successfully!</p>}
    </form>
  );
};

export default LinkedInForm;
