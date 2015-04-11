# clojure-booking-engine

A Ticket booking engine in **Clojure**

## Prerequisites

- [Leiningen][1] 2.0 or above installed.

- Postgres for database

[1]: https://github.com/technomancy/leiningen

## Running

- Run migrations using `lein ragtime migrate`

- Use `seed.sql` for seed data

- To start the web server `lein ring server`

## Endpoints

- **GET** `/sessions/:sessionId` lists all sessions.

- **POST** `/orders --data "sessionId=:sessionId&seatName=:seatNames"` orders a ticket for a session.

*Note: For POST you need an anti-forgery token for security purpose* ;)
