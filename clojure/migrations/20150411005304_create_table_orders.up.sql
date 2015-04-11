CREATE TABLE
orders (
  id SERIAL PRIMARY KEY,
  created_at DATE  NOT NULL default CURRENT_DATE
);
