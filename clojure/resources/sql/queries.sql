--name:get-session
-- shows session_name for that session_id
SELECT name
FROM sessions
WHERE id = :sessionId;

--name:get-available-seats
-- shows available seats for a single order
SELECT seat_name FROM seats
EXCEPT
SELECT seat_name FROM order_seats
WHERE order_id = :orderId;


--name:post-order
-- Post an order
INSERT INTO orders
DEFAULT VALUES;
