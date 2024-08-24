import axios from 'axios';

const postUpdate = async (message) => {
  try {
    await axios.post('https://api.linkedin.com/v2/shares', {
      content: {
        contentEntities: [{ entityLocation: 'https://your-url.com' }],
        title: 'Your Post Title',
      },
      distribution: { linkedInDistributionTarget: {} },
      owner: 'urn:li:person:YOUR_PERSON_URN',
      text: { text: message },
    }, {
      headers: {
        'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error posting update:', error);
  }
};

export default postUpdate;
