const db = require("../dbConfig");

module.exports = {
  findMeds,
  findMedById,
  findMedBy,
  findUsersMeds,
  addMed,
  updateMed,
  deleteMed
};

function findMeds() {
  return db("meds");
}

function findMedById(id) {
  return db("meds")
    .where({ id })
    .first();
}

function findMedBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findUsersMeds(id) {
  return db("meds").where({ user_id: id });
}

function addMed(med) {
  return db("meds")
    .insert(med)
    .returning("*");
}

function updateMed(id, updates) {
  return db("meds")
    .where({ id })
    .update(updates)
    .returning("*");
}

function deleteMed(id) {
  return db("meds")
    .where({ id })
    .del()
    .returning("*");
}
