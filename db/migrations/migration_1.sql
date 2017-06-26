\connect crud_apps_development

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS apps (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(1024)
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS routes (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  app_id INTEGER REFERENCES apps(id)
);

CREATE TABLE IF NOT EXISTS tables (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  app_id INTEGER REFERENCES apps(id)
);

CREATE TABLE IF NOT EXISTS columns (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  placement INTEGER,
  table_id INTEGER REFERENCES tables(id)
);

CREATE TABLE IF NOT EXISTS forms (
  id BIGSERIAL PRIMARY KEY,
  kind INTEGER, /* update or add */
  placement INTEGER,
  column_id INTEGER REFERENCES tables(id),
  field_id INTEGER REFERENCES fields(id)
);

CREATE TABLE IF NOT EXISTS fields (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  placement INTEGER, /* where in the order */
  column_id INTEGER REFERENCES columns(id)
);
