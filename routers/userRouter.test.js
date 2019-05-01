const db = require('../data/dbConfig.js');
const request = require('supertest');
const express = require('express');
const userRouter = require('./userRouter.js');

const jokexpress = express();

jokexpress.use('/', userRouter);

const testUser = {
  username: 'theTestmaster',
  password: 'testing_is_good',
  first_name: 'Luis',
  last_name: 'Hernandez'
}; // Luis will help us out with testing! Won't you, Luis?

beforeAll(() => {
  db('users').insert(testUser);
}); // Makes sure at least one user is there to get.

describe('a functional test environment', () => {
  it("needs to match the knexfile's test DB environment", () => {
    expect(process.env.DB_ENV).toEqual('testing');
  });

  it('needs environmental connection variables', () => {
    expect(process.env.DB_TEST_HOST).toBeTruthy();
    expect(process.env.DB_TEST_DATABASE).toBeTruthy();
    expect(process.env.DB_TEST_USER).toBeTruthy();
  }); // More tests could be scheduled, but port and password can both be optional.
});

describe('userRouter', () => {
  it('should respond affirmatively to getting a user', async () => {
    const response = await request(jokexpress)
      .get('/1')
      .set('Accept', 'application/json');

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  it("shouldn't be so confident when it gets a user that isn't there", async () => {
    const response = await request(jokexpress)
      .get('/0')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
  });
});
