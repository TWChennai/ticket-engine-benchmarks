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
  (layout/render
    "session.json"
    {:sessionName
      (get (first (db/get-session {:sessionId (read-string sessionId)}))
       :name
       "Not Found")}))

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/sessions/:sessionId" [sessionId] (get-session sessionId)))
