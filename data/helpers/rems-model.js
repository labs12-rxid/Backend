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
    .select('*')
    .join('meds', 'meds.id', 'rems.med_id')
    .where({ id })
    .first();
  return rem;
}

function findBy(user_id) {
  return db('rems')
    .select('*')
    .join('meds', 'meds.id', 'rems.med_id')
    .where({ 'rems.user_id': user_id });
}

async function add(rems) {
  const [med_id] = await db('rems')
    .insert(rems)
    .returning('med_id');
  return await db('rems')
    .select('*')
    .join('meds', 'meds.id', 'rems.med_id')
    .where({ med_id });
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
