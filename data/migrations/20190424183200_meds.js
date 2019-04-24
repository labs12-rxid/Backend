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
    table.integer('med_size', 16);
    table.string('med_size_unit', 32);
    table.integer('med_dose', 16);
    table.string('med_dose_unit', 32);
    table.integer('med_dose_freq', 16);
    table.string('med_dose_freq_unit', 32);
    table.string('med_dir_1', 64);
    table.string('med_dir_2', 64);
    table.string('med_dir_3', 64);
    table.string('med_dir_4', 64);
    table.string('med_dir_5', 64);
    table.time('med_admin_time_1');
    table.boolean('med_diary_active').defaultTo(false);
    table.time('med_diary_time_1');
    table.string('med_ingr');
    table.string('med_side_eff');
    table.string('med_notes', 1024);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('meds');
};
