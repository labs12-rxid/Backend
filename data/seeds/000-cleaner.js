exports.seed = function(knex) {
  // return knex.schema.raw('DROP TABLE users, meds, diaries, rems;'); // Uncomment this to drop all tables instead on seed.run();
  return knex.schema.raw(
    'TRUNCATE users, meds, diaries, rems RESTART IDENTITY;'
  ); // Bypasses PG strictness on FKs when conducting teardown.
};
