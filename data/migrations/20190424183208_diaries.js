exports.up = function(knex) {
  return knex.schema.createTable('diaries', table => {
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
    table.string('diary_date');
    table.string('diary_emoji');
    table.string('diary_text', 1024);
  });
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS diaries CASCADE');
};
