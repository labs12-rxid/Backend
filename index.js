require('dotenv').config();

const server = require('./api/server.js');
const port = process.env.NODE_PORT || 5000;

// Twilio SMS code - do not disturb
// const scheduler = require('./reminders/scheduler.js');

server.listen(port, function() {
  console.log(`*** Server listening on port ${port}. ***`);
});
