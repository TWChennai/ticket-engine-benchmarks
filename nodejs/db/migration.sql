DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS orders_seats;

CREATE TABLE sessions (
    id integer NOT NULL,
    name text
);

CREATE SEQUENCE sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE orders (
    created_at TIMESTAMP DEFAULT now(),
    id integer NOT NULL
);

CREATE SEQUENCE orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE order_seats (
    id integer NOT NULL,
    booked_seat text,
    session_id integer NOT NULL,
    order_id integer NOT NULL
);

CREATE SEQUENCE order_seats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE order_seats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


insert into sessions(id, name) values(1, 'FAST AND FURIOUS 7');
insert into sessions(id, name) values(2, 'KINGS MAN');
insert into sessions(id, name) values(3, 'PRESTIGE');
insert into sessions(id, name) values(4, 'HOBBIT');
insert into sessions(id, name) values(5, 'CITY OF EMBER');
insert into sessions(id, name) values(6, 'THE MECHANIC');
insert into sessions(id, name) values(7, 'THE MARIN');
insert into sessions(id, name) values(8, 'EYES WIDE SHUT');
insert into sessions(id, name) values(9, 'BATMAN');
insert into sessions(id, name) values(10, 'SUPERMAN');
insert into sessions(id, name) values(11, 'TERMINATOR');