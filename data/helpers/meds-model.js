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
  return db("users")
    .join("meds", "users.id", "meds.user_id")
    .where({ "users.id": id });
}

async function addMed(med) {
  const [id] = await db("meds")
    .insert(med)
    .returning("id");
  return findById(id);
}

function updateMed(id, updates) {
  return db("meds")
    .where({ id })
    .update(updates);
}

function deleteMed(id) {
  return db("meds")
    .where({ id })
    .del();
}
