const cron = require('node-cron');
const moment = require('moment');

const remindersWorker = require('./notificationsWorker.js');

const scheduler = cron.schedule('* * * * *', () => {
  console.log('Running Send Reminders Worker for ' + moment().format());
  remindersWorker.run();
});

module.exports = scheduler;
