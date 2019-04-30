# Using Postgres as a Database

## Why Not SQLite?

Lambda School teaches SQLite with Knex.js because it is very forgiving in some senses. If you mess up your database, you can simply delete the database file and run Knex's migrations again. This makes learning with SQLite much easier than it is with other databases, because you always have an intuitive escape hatch. To be sure, SQLite can actually run a decently-sized site without breaking! It is not acceptable, however, for high-intensity production use, and by focusing on being "lite", it lacks features that high-powered relational databases can exploit.

This may have dogged you somewhere into Build Week as you set up your SQLite database. You were trying to run tests on it and it suddenly reported that it was "locked" in some way. This is because your code attempted to do two file accesses at the same time. Probably you were running a test in Jest, using a lot of setup and teardown during an afterEach or beforeAll, and SQLite, Node, and Jest lost track of what was going on. SQLite can handle accesses pretty fast, so no merely individual query you would write is likely to do this, but the machines we work with are designed to handle... or deliver... hundreds of inputs and outputs.

## Developing with Postgres



### Knex

The good news is that 

## With Amazon Web Services