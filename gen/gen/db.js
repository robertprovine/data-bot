const inputs = require('../inputs');

const db = zip => {

  /* create config file */
  let file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`const pgp = require('pg-promise')();

let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: '${inputs.db_name}_development',
    port: 5432,
    host: 'localhost'
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp({
    database: '${inputs.db_name}_production',
    port: 5432,
    host: 'localhost'
  });
}

module.exports = db;
`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  zip.addFile("db/config.js", new Buffer(file), "config.js");

  /* create tables and columns */
  let tables = '';
  for (let i = 0; i < inputs.tables.length; i++) {
    let columns = '';
    for (let j = 0; j < inputs.tables[i].columns.length; j++) {
      let comma = ',';
      if (j === (inputs.tables[i].columns.length - 1)) {
        comma = '';
      }
      columns =
/* - { { { - */
`${columns}  ${inputs.tables[i].columns[j].name} ${inputs.tables[i].columns[j].type}${comma}
`;
/* - } } } - */
    }
    tables =
/* - { { { - */
`${tables}
CREATE TABLE IF NOT EXISTS ${inputs.tables[i].name} (
  id BIGSERIAL PRIMARY KEY,
${columns});
`;
/* - } } } - */
  }

  /* create migration file */
  file =

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
`\\connect ${inputs.db_name}_development
${tables}`;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  zip.addFile("db/migrations/migration_1.sql", new Buffer(file), "migration_1.sql");
};

module.exports = db;

