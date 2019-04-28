// Testing a database can involve a considerable amount of setup and teardown,
// so it's preferable to handle database tests in a single test file.
const db = require("../dbConfig.js");
const Users = require("./users-model.js");

const testUser = { 
  username: "theTestmaster",
  password: "testing_is_good",
  first_name: "Luis",
  last_name: "Hernandez"
} // Luis will help us out with testing! Won't you, Luis?


beforeAll(() => {
  return db.seed.run();
}); // Please run test migrations first: npx knex migrate:latest --env testing

// EMERGENCY FIX for "my test DB has been placed into an unrecoverable state by migration errors."
// After uncommenting and letting Jest run it, you will have to rerun knex migrate:latest --env testing
// 
// afterAll(() => {
//   return db.schema.raw(
//     "DROP TABLE users, meds, diaries, rems;" 
//   );
// });


describe("a functional test environment", () => {
  it("needs to match the knexfile's test DB environment", () => {
    expect(process.env.DB_ENV).toEqual('testing');
  });

  it("needs environmental connection variables", () => {
    expect(process.env.DB_TEST_HOST).toBeTruthy();
    expect(process.env.DB_TEST_DATABASE).toBeTruthy();
    expect(process.env.DB_TEST_USER).toBeTruthy();
  }); // More tests could be scheduled, but port and password can both be optional.
});

describe("Database user model", () => {
  it("should find at least 500 users from seeding", async () => {
    const userList = await Users.find();

    expect(userList.length).toBeGreaterThanOrEqual(500);
  })

  it("should be able to find a user by ID", async () => {
    const user = await Users.findById(1);

    expect(user).toHaveProperty('id', 1)
  })

  it("should return a user which matches schema requirements", async () => {
    const user = await Users.findById(1);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('premium');
  })

  it("should be able to add a user, even if they don't have all vars set", async () => {
    const returnedUser = await Users.add(testUser);

    expect(returnedUser).toMatchObject(testUser);
  })

  it("should be able to find the user I added earlier", async () => {
    const foundUser = await Users.findBy(testUser);

    expect(foundUser).toMatchObject(testUser);
  })
});