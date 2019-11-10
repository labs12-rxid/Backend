// const fs = require('fs');
const fakeUsers = require('../dummyData/fakeUsers.json')['users'];

exports.seed = function(knex) {
  return knex('users').insert(fakeUsers);
};
