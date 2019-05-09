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
  return db('rems');
}

async function findById(id) {
  const rem = await db('rems')
    .where({ id })
    .first();
  return rem;
}

function findBy(user_id) {
  return db('rems')
    .join('meds', 'meds.id', 'rems.med_id')
    .select('*')
    .where({ 'rems.user_id': user_id });
}

async function add(rem) {
  const newRem = await db('rems')
    .insert(rem)
    .returning('*');
  return newRem['0'];
  // postgreSQL returns the object inside of an object. This will return the rem object that we want.
}

async function update(id, updates) {
  const [rem] = await db('rems')
    .where({ id })
    .update(updates)
    .returning('*');
  return rem;
}

async function remove(id) {
  const [rem] = await db('rems')
    .where({ id })
    .del()
    .returning('*');
  return rem;
}
