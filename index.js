require('dotenv').config();
const util = require('util');

const server = require('./api/server.js');
const port = process.env.PORT || 5000;

// Twilio SMS code - do not disturb
// const scheduler = require('./reminders/scheduler.js');

server.listen(port, function() {
  util.log(`*** Server listening on port ${port}. ***`);
});
