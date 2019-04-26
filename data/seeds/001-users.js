const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fakeUsers = require("../dummyData/fakeUsers.json")["users"];

// const createFakeUser = () => ({
//   email: faker.internet.email(),
//   first_name: faker.name.firstName(),
//   last_name: faker.name.lastName(),
//   username: faker.internet.userName(),
//   password: faker.internet.password(),
//   phone: faker.phone.phoneNumber()
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

  const hashedFakeUsers = fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
    return user;
  });

  return knex("users").insert(hashedFakeUsers);
};
