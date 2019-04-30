const db = require('../dbConfig');

module.exports = {
  find,
  findById,
  findBy,
  findUsersMeds,
  add,
  update,
  remove
};

function find() {
  return db('meds');
}

async function findById(id) {
  const med = await db('meds')
    .where({ id })
    .first();
  med.diaries = await db('diaries').where({ med_id: id });
  return med;
}

function findBy(filter) {
  return db('meds')
    .where(filter)
    .first();
}

function findUsersMeds(id) {
  return db('meds').where({ user_id: id });
}

function add(med) {
  return db('meds')
    .insert(med)
    .returning('*');
}

function update(id, updates) {
  return db('meds')
    .where({ id })
    .update(updates)
    .returning('*');
}

function remove(id) {
  return db('meds')
    .where({ id })
    .del()
    .returning('*');
}
