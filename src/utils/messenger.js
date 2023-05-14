const axios = require('axios');

require('dotenv').config();

const MESSAGE_API_TOKEN = process.env.MESSAGE_API_TOKEN || '';
const MESSAGE_CHANNEL = process.env.MESSAGE_CHANNEL || '';

const MESSAGE_FORMAT = 'Markdown';

const sendMessage = async (message) => {
  let isSuccess = false;

  if (typeof message === 'string' && message.length > 0) {
    const url = `https://api.telegram.org/bot${MESSAGE_API_TOKEN}/sendMessage?chat_id=@${MESSAGE_CHANNEL}&parse_mode=${MESSAGE_FORMAT}&text=${message}`;

    // Send message
    const { data } = await axios.post(url);

    console.info();

    isSuccess = true;
  } else {
    console.error('Message is empty!');
  }

  return isSuccess;
};

module.exports = {
  sendMessage
};
