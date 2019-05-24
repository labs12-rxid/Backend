exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table
      .string('profile_image_url')
      .defaultTo(
        knex.raw("CONCAT('avatar-default-', floor(random() *6 + 1)::text, '.png')")
      );
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('profile_image_url');
  });
};
