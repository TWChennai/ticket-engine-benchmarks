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
WHERE session_id = :sessionId;


--name:post-order<!
-- Post an order
INSERT INTO orders
DEFAULT VALUES;


--name: order-seat!
-- Ordering a seat dammit!
INSERT INTO order_seats
(order_id,session_id,seat_name)
VALUES (:orderId, :sessionId, :seatName);
