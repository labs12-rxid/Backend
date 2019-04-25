const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fakeUsers = require("../dummyData/fakeUsers.json")["users"];

// const createFakeUser = () => ({
//   email: faker.internet.email(),
//   first_name: faker.name.firstName(),
//   last_name: faker.name.lastName(),
//   username: faker.internet.userName(),
//   password: bcrypt.hashSync(faker.internet.password(), 8)
// });

exports.seed = function(knex, Promise) {
  // const fakeUsers = [];

  // for (let i = 0; i < 500; i++) {
  //   fakeUsers.push(createFakeUser());
  // }

  // fs.writeFileSync(
  //   "./data/dummyData/fakeUsers.json",
  //   JSON.stringify({ users: fakeUsers })
  // );

  return knex("users").insert(fakeUsers);
};
