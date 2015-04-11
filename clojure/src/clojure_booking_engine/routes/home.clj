(ns clojure-booking-engine.routes.home
  (:require [clojure-booking-engine.layout :as layout]
            [compojure.core :refer [defroutes GET]]
            [clojure.java.io :as io]
            [clojure-booking-engine.db.core :as db]))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defn get-session [sessionId]
  (def sessionIdAsString (read-string sessionId))
  (def sessionName (get (first (db/get-session {:sessionId sessionIdAsString})) :name))
  (def seatsAvailable
    (apply str (interpose
                  ","
                  (map :seat_name (db/get-available-seats {:sessionId sessionIdAsString})))))
  (layout/render
    "session.json"
    {:sessionName sessionName :seatsAvailable seatsAvailable}))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/sessions/:sessionId" [sessionId] (get-session sessionId)))
