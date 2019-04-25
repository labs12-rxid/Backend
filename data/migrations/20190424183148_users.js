exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('username', 64)
      .notNullable()
      .unique();
    table.string('password', 64).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('premium').defaultTo(false);
    table.string('email', 64);
    table.integer('phone', 32);
    table.string('first_name', 64);
    table.string('last_name', 64);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
