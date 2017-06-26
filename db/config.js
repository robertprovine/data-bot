const pgp = require('pg-promise')();

let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: 'crud_apps_development',
    port: 5432,
    host: 'localhost',
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp({
    database: 'crud_apps_production',
    port: 5432,
    host: 'localhost',
  });
}

module.exports = db;

