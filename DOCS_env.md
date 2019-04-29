# Environment Secrets Used To Launch Server

## Miscellaneous

### PORT
Sets the launch port of the application, used in index.js

## Database

### DB_ENV
Sets the knex configuration object used from knexfile.js. Specified in dbConfig.js

### DB_DEV_, DB_TEST_, DB_PROD_

Sets the connection specified in knexfile.js.

DB_DEV_HOST specifies the hostname of the development database.
DB_DEV_DATABASE specifies the name of the database itself.
DB_DEV_USER specifies the username that is used for logging in to the database.
DB_DEV_PASSWORD specifies the password that is used for logging in to the database.
DB_DEV_PORT specifies the port, but this should always be 5432, so it need not be specified.

DB_TEST_(et cetera) and DB_PROD_(et cetera) variables work identically to DB_DEV_ ones.
The triplicate specification is to guarantee a database is connected to in case of a logical error.
Overspecifying like this is sometimes considered "bad" programming but this defends from accidents.

### dbConfig.js
DB_ENV sets environment used from knexfile.js.