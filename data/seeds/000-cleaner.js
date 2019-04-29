<<<<<<< HEAD
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  // return knex.schema.raw('DROP TABLE users, meds, diaries, rems;'); // Uncomment this to drop all tables instead on seed.run();
=======
exports.seed = function(knex) {
  // return knex.schema.raw(
  //   "DROP TABLE users, meds, diaries, rems;" 
  // ); // Uncomment this to drop all tables instead on seed:run

>>>>>>> bc9c91bcdcc102b6a3df011767ac693858c88c7b
  return knex.schema.raw(
    'TRUNCATE users, meds, diaries, rems RESTART IDENTITY;'
  ); // Bypasses PG strictness on FKs when conducting teardown.
};