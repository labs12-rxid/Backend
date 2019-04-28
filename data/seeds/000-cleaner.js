const cleaner = require("knex-cleaner");

exports.seed = function(knex) {
  return knex.schema.raw(
    "TRUNCATE users, meds, diaries, rems RESTART IDENTITY;"
  ); // Bypasses PG strictness on FKs when conducting teardown.
};
