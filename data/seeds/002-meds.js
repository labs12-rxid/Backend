exports.seed = function(knex) {
  return knex('meds').insert([
    {
      id: 1,
      user_id: 1,
      med_name: 'acetaminophen',
      med_rx: 190234,
      med_pharm_phone: 1234567890,
      med_type: 'tablet',
      med_admin_mode: 'oral',
      med_color: 'white',
      med_shape: 'oval',
      med_strength: 325,
      med_strength_unit: 'mg',
      med_dose: 650,
      med_dose_unit: 'mg',
      med_dose_freq: 2,
      med_dose_freq_unit: 'day',
      med_directions: JSON.stringify(['Take with food.', 'Take with water.']),
      med_admin_start_date: '2019-05-20',
      med_admin_end_date: '2019-05-27',
      med_admin_times: JSON.stringify(['00:08:00', '00:20:00']),
      med_diary_active: true,
      med_diary_start_date: '2019-05-20',
      med_diary_end_date: '2019-05-27',
      med_diary_times: JSON.stringify([['00:09:00', '00:21:00']]),
      med_ingredients:
        'Acetaminophen, cellulose, cornstarch, hypromellose, magnesium stearate, polyethylene glycol, and sodium starch glycolate. Gluten-, lactose-, and tartrazine-free.',
      med_side_effects: 'Drowsiness, increased appetite',
      med_notes: 'I thought this was available OTC...'
    }
  ]);
};
