const db = require('../dbConfig');

module.exports = {
  find,
  findById,
  findBy,
  add,
  update,
  remove
};

function find() {
  return db('diaries');
}

function findById(id) {
  return db('diaries')
    .where({ id })
    .first();
}

function findBy(user_id) {
  return db('diaries')
    .leftJoin('meds', 'meds.id', 'med_id')
    .select(
      'diaries.id as id',
      'meds.id as med_id',
      'med_name',
      'diary_date',
      'diary_emoji',
      'diary_text'
    )
    .where({ 'diaries.user_id': user_id });
}

async function add(diary) {
  let newDiary = await db('diaries')
    .insert(diary)
    .returning('*');
  newDiary = await db('diaries')
    .leftJoin('meds', 'meds.id', 'med_id')
    .select(
      'diaries.id as id',
      'meds.id as med_id',
      'med_name',
      'diary_date',
      'diary_emoji',
      'diary_text'
    )
    .where({ 'diaries.id': newDiary[0].id });
  return newDiary[0];
  // postgreSQL returns the object inside of an object. This will return the diary object that we want.
}

async function update(id, updates) {
  await db('diaries')
    .where({ id })
    .update(updates);

  const editedEntry = await db('diaries')
    .leftJoin('meds', 'meds.id', 'med_id')
    .select(
      'diaries.id as id',
      'meds.id as med_id',
      'med_name',
      'diary_date',
      'diary_emoji',
      'diary_text'
    )
    .where({ 'diaries.id': id });

  return editedEntry[0];
}

async function remove(id) {
  const [diary] = await db('diaries')
    .where({ id })
    .del()
    .returning('*');
  return diary;
}
