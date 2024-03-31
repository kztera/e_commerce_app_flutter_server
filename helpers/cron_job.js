const cron = require('node-cron');

cron.schedule('00 00 * * *', async function () {
  try {
    console.log('CRON job completed at', new Date());
  } catch (error) {
    console.error('CRON job error:', error);
  }
});
