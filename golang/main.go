package main

import (
	"db"
	"fmt"
	"log"
	"net/http"
	_ "net/http/pprof"
	"order"
	"session"
)

func main() {

	db.InitDB()
	server := &http.Server{
		Addr:    ":3000",
		Handler: &Handler{},
	}
	fmt.Println("Listening on Port: 3000")
	err := server.ListenAndServe()
	if err != nil {
		log.Fatalf("ERR: %+v", err)
	}
}

type Handler struct {
}

const (
	HTTP_GET  = "GET"
	HTTP_POST = "POST"
)

func (*Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	switch {
	case session.Regexp.MatchString(r.RequestURI) && r.Method == HTTP_GET:
		session.GetSession(w, r)
	case order.Regexp.MatchString(r.RequestURI) && r.Method == HTTP_POST:
		order.CreateOrder(w, r)
	default:
		w.WriteHeader(http.StatusNotFound)
	}
}
