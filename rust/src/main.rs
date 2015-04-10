extern crate iron;
extern crate router;
extern crate postgres;
extern crate rustc_serialize;

use rustc_serialize::json;
use iron::{Iron, Request, Response, IronResult};
use iron::status;
use router::{Router};
use postgres::{Connection, SslMode};

#[derive(RustcEncodable, RustcDecodable)]
struct Session {
    id: i32,
    name: String
}

fn main() {
    let mut router = Router::new();
    router.get("/sessions/:session_id", session_details);

    Iron::new(router).http("localhost:3000").unwrap();

    fn session_details(req: &mut Request) -> IronResult<Response> {

        let query = req.extensions.get::<Router>().unwrap().find("session_id").unwrap().parse::<i32>().unwrap();

        let conn = Connection::connect("postgres://selva@localhost/tickets", &SslMode::None).unwrap();
        let stmt = conn.prepare("SELECT id, name FROM sessions where id = $1").unwrap();

        let rows = stmt.query(&[&query]).unwrap();
        match rows.iter().next() {
            Some(row) => Ok(Response::with((status::Ok, json::encode(&Session {  id: row.get(0),   name: row.get(1)    }).unwrap() ))),
            None => Ok(Response::with((status::NotFound, "Not Found" )))
        }
    }
  }