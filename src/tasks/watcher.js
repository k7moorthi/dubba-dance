const axios = require('axios');
const cheerio = require('cheerio');

const { sendMessage } = require('../utils/messenger');

const GRAMS_PER_SAVARAN = 8;
const NEW_LINE = '%0A';

async function getPrice() {
  const url = 'https://www.grtjewels.com/';

  const { data } = await axios.get(url);
  const $doc = cheerio.load(data);
  const price = parseInt($doc('.rate').text().match(/([Rs\.])+[\d]+/g).join().replace('Rs.', ''));

  console.info(`Today's gold price: Rs.${price}/gram`);

  return price;
}

async function init() {
  const price = await getPrice();

  if (price) {
    const result = await sendMessage(`Today's 22K 916 Gold Price:${NEW_LINE}*Rs.${price}/Gram*${NEW_LINE}*Rs.${price * GRAMS_PER_SAVARAN}/Savaran*`);

    if (result === true) {
      console.info('Message sent successfully!');
    } else {
      console.error('Message sending failed!');
    }
  } else {
    console.error('Price is not valid!');
  }
}

(async () => await init())();
