exports.up = function(knex) {
  return knex.schema.createTable('meds', table => {
    table.increments();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('med_name', 64).notNullable();
    table
      .boolean('med_active')
      .notNullable()
      .defaultTo(true);
    table.string('med_rx', 64);
    table.integer('med_pharm_phone', 32);
    table.string('med_type', 64);
    table.string('med_admin_mode', 32);
    table.string('med_color', 32);
    table.string('med_shape', 32);
    table.integer('med_strengh', 16);
    table.string('med_strength_unit', 32);
    table.integer('med_dose', 16);
    table.string('med_dose_unit', 32);
    table.integer('med_dose_freq', 16);
    table.string('med_dose_freq_unit', 32);
    table.jsonb('med_directions');
    table.date('med_admin_start_date');
    table.date('med_admin_end_date');
    table.jsonb('med_admin_times');
    table.boolean('med_diary_active').defaultTo(false);
    table.date('med_diary_start_date');
    table.date('med_diary_end_date');
    table.jsonb('med_diary_times');
    table.string('med_ingredients');
    table.string('med_side_effects');
    table.string('med_notes', 1024);
  });
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE IF EXISTS meds CASCADE');
};
