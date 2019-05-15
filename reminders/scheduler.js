const cron = require('node-cron');
const util = require('util');
const moment = require('moment');

const remindersWorker = require('./notificationsWorker.js');

const scheduler = cron.schedule('* * * * *', () => {
  util.log('Running Send Reminders Worker for ' + moment().format());
  remindersWorker.run();
});

module.exports = scheduler;
