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

function findBy(filter) {
  return db('diaries').where(filter);
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
