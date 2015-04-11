DELETE FROM order_seats;
DELETE FROM seats;
DELETE FROM orders;
DELETE FROM sessions;

ALTER SEQUENCE sessions_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;

INSERT INTO sessions (name) values ('Gone girl');
INSERT INTO sessions (name) values ('Interstellar');
INSERT INTO sessions (name) values ('Shutter Island');
INSERT INTO sessions (name) values ('Fight Club');

INSERT INTO seats values ('A00');
INSERT INTO seats values ('A01');
INSERT INTO seats values ('A02');
INSERT INTO seats values ('A03');
INSERT INTO seats values ('A04');
INSERT INTO seats values ('A05');
INSERT INTO seats values ('A06');
INSERT INTO seats values ('A07');
INSERT INTO seats values ('A08');
INSERT INTO seats values ('A09');
INSERT INTO seats values ('A10');
