CREATE TABLE
order_seats (
  order_id INTEGER,
  session_id INTEGER REFERENCES sessions(id),
  seat_name VARCHAR(50)
);
