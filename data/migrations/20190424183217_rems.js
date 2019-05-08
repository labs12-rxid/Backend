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
    table.date('rem_date');
  });
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS rems CASCADE');
};
