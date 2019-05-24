describe('a functional test environment', () => {
  it("needs to match the knexfile's test DB environment", () => {
    expect(process.env.DB_ENV).toEqual('testing');
  });
});
