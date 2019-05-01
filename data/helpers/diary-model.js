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
    .select('diaries.id', 'med_name', 'diary_date', 'diary_emoji', 'diary_text')
    .where({ 'diaries.user_id': user_id });
}

function add(diary) {
  return db('diaries')
    .insert(diary)
    .returning('*');
}

function update(id, updates) {
  return db('diaries')
    .where({ id })
    .update(updates)
    .returning('*');
}

function remove(id) {
  return db('diaries')
    .where({ id })
    .del()
    .returning('*');
}
