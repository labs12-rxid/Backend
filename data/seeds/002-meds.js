const fs = require('fs');
const faker = require('faker');
const fakeMeds = require('../dummyData/fakeMeds.json')['meds'];

exports.seed = function(knex) {
  // const fakeMeds = [];
  // const fakeMed = {
  //   user_id: 1,
  //   med_name: 'acetaminophen',
  //   med_rx: 190234,
  //   med_pharm_phone: 1234567890,
  //   med_type: 'tablet',
  //   med_admin_mode: 'oral',
  //   med_color: 'white',
  //   med_shape: 'oval',
  //   med_strength: 325,
  //   med_strength_unit: 'mg',
  //   med_dose: 650,
  //   med_dose_unit: 'mg',
  //   med_dose_freq: 2,
  //   med_dose_freq_unit: 'day',
  //   med_directions: JSON.stringify(['Take with food.', 'Take with water.']),
  //   med_admin_start_date: '2019-05-20',
  //   med_admin_end_date: '2019-05-27',
  //   med_admin_times: JSON.stringify(['00:08:00', '00:20:00']),
  //   med_diary_active: true,
  //   med_diary_start_date: '2019-05-20',
  //   med_diary_end_date: '2019-05-27',
  //   med_diary_times: JSON.stringify([['00:09:00', '00:21:00']]),
  //   med_ingredients:
  //     'Acetaminophen, cellulose, cornstarch, hypromellose, magnesium stearate, polyethylene glycol, and sodium starch glycolate. Gluten-, lactose-, and tartrazine-free.',
  //   med_side_effects: 'Drowsiness, increased appetite',
  //   med_notes: 'I thought this was available OTC...'
  // };
  // fakeMeds.push(fakeMed);

  // for (let i = 1; i < 1000; i++) {
  //   const createFakeMedication = () => ({
  //     user_id: i <= 500 ? i : i - 500,
  //     med_name: faker.commerce.productName(),
  //     med_rx: faker.random.number(),
  //     med_pharm_phone: faker.phone.phoneNumber(),
  //     med_type: 'tablet',
  //     med_admin_mode: 'oral',
  //     med_color: faker.commerce.color(),
  //     med_shape: 'oval',
  //     med_strength: faker.random.number(),
  //     med_strength_unit: 'mg',
  //     med_dose: faker.random.number(),
  //     med_dose_unit: 'mg',
  //     med_dose_freq: i,
  //     med_dose_freq_unit: 'day',
  //     med_directions: JSON.stringify(['Take with food.', 'Take with water.']),
  //     med_admin_start_date: faker.date.past(),
  //     med_admin_end_date: faker.date.future(),
  //     med_admin_times: JSON.stringify([
  //       faker.date.recent(),
  //       faker.date.recent()
  //     ]),
  //     med_diary_active: true,
  //     med_diary_start_date: faker.date.past(),
  //     med_diary_end_date: faker.date.future(),
  //     med_diary_times: JSON.stringify([
  //       [faker.date.recent(), faker.date.recent()]
  //     ]),
  //     med_ingredients: faker.lorem.paragraph(),
  //     med_side_effects: `${faker.lorem.word()}, ${faker.lorem.word()}`,
  //     med_notes: faker.lorem.sentence()
  //   });
  //   fakeMeds.push(createFakeMedication());
  // }

  // fs.writeFileSync(
  //   './data/dummyData/fakeMeds.json',
  //   JSON.stringify({ meds: fakeMeds })
  // );

  return knex('meds').insert(fakeMeds);
};
