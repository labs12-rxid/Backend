const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users")
    .insert(user)
    .returning("id");
  console.log(`User #${id} added`);
  return findById(id);
}

function findById(id) {
  console.log(`Finding user with the id ${id}`);
  return db("users")
    .where({ id })
    .first();
}
