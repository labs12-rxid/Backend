exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table
      .string('profile_image_url')
      .defaultTo(
        knex.raw("CONCAT('avatar-default-', floor(random() *6 + 1)::text)")
      );
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('profile_image_url');
  });
};
