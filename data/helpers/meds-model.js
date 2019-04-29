const db = require("../dbConfig");

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
  return db("meds");
}

function findById(id) {
  return db("meds")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findUsersMeds(id) {
  return db("meds").where({ user_id: id });
}

function add(med) {
  return db("meds")
    .insert(med)
    .returning("*");
}

function update(id, updates) {
  return db("meds")
    .where({ id })
    .update(updates)
    .returning("*");
}

function remove(id) {
  return db("meds")
    .where({ id })
    .del()
    .returning("*");
}
