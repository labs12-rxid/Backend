exports.up = function(knex) {
  return knex.schema.createTable('rems', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('med_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('meds')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .string('rem_type')
      .notNullable()
      .defaultTo('admin');
    table.string('rem_notes', 16);
    table.string('rem_date', 50);
  });
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS rems CASCADE');
};
