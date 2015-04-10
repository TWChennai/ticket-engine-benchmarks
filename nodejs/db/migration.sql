DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS orders_seats;

create table sessions(id SERIAL, name varchar);
create table orders(id VARCHAR UNIQUE, created_at TIMESTAMP DEFAULT now());
create table orders_seats(id VARCHAR, session_id INTEGER, seat_name VARCHAR);

insert into sessions(name) values('FAST AND FURIOUS 7');
insert into sessions(name) values('KINGS MAN');
insert into sessions(name) values('PRESTIGE');
insert into sessions(name) values('HOBBIT');
insert into sessions(name) values('CITY OF EMBER');
insert into sessions(name) values('THE MECHANIC');
insert into sessions(name) values('THE MARIN');
insert into sessions(name) values('EYES WIDE SHUT');
insert into sessions(name) values('BATMAN');
insert into sessions(name) values('SUPERMAN');
insert into sessions(name) values('TERMINATOR');
insert into sessions(name) values('TERMINATOR');

