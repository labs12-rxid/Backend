const cleaner = require("knex-cleaner");

exports.seed = function(knex) {
  const options = {
    mode: "truncate" // Valid options 'truncate', 'delete'
  };
  return cleaner.clean(knex, options);
};
