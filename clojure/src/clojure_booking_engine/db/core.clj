(ns clojure-booking-engine.db.core
  (:require
    [yesql.core :refer [defqueries]]))

(let [db-host "localhost"
      db-port "5432"
      db-name "booking_engine"]


(def db-spec
  {:classname   "org.postgresql.Driver"
   :subprotocol "postgresql"
   :subname     ( str "//" db-host ":" db-port "/" db-name )
   :user        "postgres"
   :make-pool?  true}))

(defqueries "sql/queries.sql" {:connection db-spec})
