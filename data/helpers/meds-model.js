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

async function add(med) {
  const newMed = await db('meds')
    .insert(med)
    .returning('*');
  return newMed['0'];
  // postgreSQL returns the object inside of an object. This will return the med object that we want.
}

async function update(id, updates) {
  const [med] = await db('meds')
    .where({ id })
    .update(updates)
    .returning('*');
  return med;
}

async function remove(id) {
  const [med] = await db('meds')
    .where({ id })
    .del()
    .returning('*');
  return med;
}
