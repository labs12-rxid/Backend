const fs = require('fs');
const faker = require('faker');
const fakeDiaries = require('../dummyData/fakeDiaries.json')['diaries'];

exports.seed = function(knex, Promise) {
  // const fakeDiaries = [];

  // for (let i = 1; i < 1000; i++) {
  //   const createFakeDiary = () => ({
  //     user_id: i <= 500 ? i : i - 500,
  //     med_id: i,
  //     diary_date: faker.date.recent(),
  //     diary_emoji: faker.lorem.word(),
  //     diary_text: faker.lorem.sentence()
  //   });
  //   fakeDiaries.push(createFakeDiary());
  // }

  // fs.writeFileSync(
  //   './data/dummyData/fakeDiaries.json',
  //   JSON.stringify({ diaries: fakeDiaries })
  // );
  const fakeDiariesDates = fakeDiaries.map(diary => {
    diary.diary_date = new Date(diary.diary_date).valueOf();
    return diary;
  });
  return knex('diaries').insert(fakeDiariesDates);
};
