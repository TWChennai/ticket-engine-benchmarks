ALTER TABLE
order_seats
ADD CONSTRAINT
unique_order_seat
UNIQUE (order_id, seat_name);
