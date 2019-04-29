const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db("users").select("id", "username", "password");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function add(user) {
  return db("users")
    .insert(user)
    .returning("*");
}

function update(id, updates) {
  return db("users")
    .where({ id })
    .update(updates)
    .returning("*");
}

function remove(id) {
  return db("users")
    .where({ id })
    .del()
    .returning("*");
}
