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
    router.get("/", handler);
    router.get("/:query", handler);

    Iron::new(router).http("localhost:3000").unwrap();

    fn handler(req: &mut Request) -> IronResult<Response> {
        let query = req.extensions.get::<Router>().unwrap().find("query").unwrap_or("/");

        let conn = Connection::connect("postgres://selva@localhost/tickets", &SslMode::None).unwrap();
        let stmt = conn.prepare("SELECT id, name FROM sessions").unwrap();

        let mut sessions: Vec<Session> = Vec::new();
        for row in stmt.query(&[]).unwrap() {
          let session = Session {
            id: row.get(0),
            name: row.get(1)
          };
          sessions.push(session);
        }

        Ok(Response::with((status::Ok, json::encode(&sessions).unwrap())))
    }
  }