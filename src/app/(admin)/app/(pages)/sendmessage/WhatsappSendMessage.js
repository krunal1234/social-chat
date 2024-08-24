import axios from 'axios';

const sendMessage = async (phoneNumber, message) => {
  try {
    await axios.post('https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages', {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      text: { body: message }
    }, {
      headers: {
        'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export default sendMessage;
