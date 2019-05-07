const Reminder = require('./reminder');

const remindersWorker = function() {
  return {
    run: function() {
      Reminder.sendNotifications();
    }
  };
};

module.exports = remindersWorker();
