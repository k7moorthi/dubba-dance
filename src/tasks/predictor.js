const axios = require('axios');

const { sendMessage } = require('../utils/messenger');

async function getPosition() {
  const url = 'https://www.moneycontrol.com/techmvc/responsive/commodity/ajax_get_last_visited?asset_class=11';

  const { data } = await axios.get(url);

  const goldPrice = data.data.find((entry) => entry.disid.includes('gold'));
  const position = {
    price: goldPrice.pr,
    change: {
      value: goldPrice.chg,
      percent: goldPrice.pchg,
    }
  };

  console.info(`Today's market position: ${JSON.stringify(position)}`);

  return position;
}

async function init() {
  const position = await getPosition();
  const changePercent = position.change.percent;

  if (typeof changePercent === 'number' && changePercent) {
    const result = await sendMessage(`The price _may_ *${changePercent >= 0 ? 'increase' : 'reduce'}* _approximately_ by *${changePercent}%* tomorrow!`);

    if (result === true) {
      console.info('Message sent successfully!');
    } else {
      console.error('Message sending failed!');
    }
  } else {
    console.error('Position change is not valid!');
  }
}

(async () => await init())();
