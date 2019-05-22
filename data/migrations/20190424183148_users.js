exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('phone', 32);
    table.string('first_name', 64);
    table.string('last_name', 64);
    table.string('auth_id', 128).unique();
    table.string('sort_diary_meds').defaultTo('alpha');
  });
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS users CASCADE');
};
