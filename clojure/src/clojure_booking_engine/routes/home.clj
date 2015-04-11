(ns clojure-booking-engine.routes.home
  (import java.sql.SQLException)
  (:require [clojure-booking-engine.layout :as layout]
            [clojure.string :as str]
            [compojure.core :refer [defroutes GET POST]]
            [clojure.java.io :as io]
            [clojure-booking-engine.db.core :as db]
            [taoensso.timbre :as console]))

(defn home-page []
  (layout/render
    "home.html" {:docs (-> "docs/docs.md" io/resource slurp)}))

(defn about-page []
  (layout/render "about.html"))

(defn get-session [sessionId]
  (let [sessionIdAsInteger (read-string sessionId)
        sessionName (get (first (db/get-session {:sessionId sessionIdAsInteger})) :name )
        seatsAvailable (apply str(interpose "," (map :seat_name (db/get-available-seats {:sessionId sessionIdAsInteger}))))]
    (layout/render "session.json" {:sessionName sessionName :seatsAvailable seatsAvailable})))

(defn order-seat [request]
  (let [sessionId     (read-string (get (:params request) :sessionId))
        seatNamesReq  (get (:params request) :seatNames)
        seatNames     (str/split seatNamesReq #",")
        orderId       (get (db/post-order<!) :id)]
        (try (doall (map
          (fn [seatName]
            (db/order-seat! {:orderId orderId :sessionId sessionId :seatName seatName}))
          seatNames))
        (catch SQLException e (.printStackTrace (.getCause e))))
        { :status 200}))



(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/about" [] (about-page))
  (GET "/sessions/:sessionId" [sessionId] (get-session sessionId))
  (POST "/orders" req (order-seat req))
  )
