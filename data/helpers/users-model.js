const db = require('../dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

async function add(user) {
  const newUser = await db('users')
    .insert(user)
    .returning('*');
  return newUser['0'];
  // postgreSQL returns the object inside of an object. This will return the user object that we want.
}

async function update(id, updates) {
  const [user] = await db('users')
    .where({ id })
    .update(updates)
    .returning('*');
  return user;
}

async function remove(id) {
  const [user] = await db('users')
    .where({ id })
    .del()
    .returning('*');
  return user;
}

// async function remove(id) {
//   const [med] = await db('meds')
//     .where({ id })
//     .del()
//     .returning('*');
//   return med;
// }
