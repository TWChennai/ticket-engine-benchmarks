package main

import (
	"fmt"
	"log"
	"net/http"
	"order"
	"session"
	"session/daos"
)

func main() {
	fmt.Println("Hello Go!")
	daos.InitDB()
	server := &http.Server{
		Addr:    ":3000",
		Handler: &Handler{},
	}

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
		log.Printf("Order. Req: %+v", r)
	default:
		w.WriteHeader(http.StatusNotFound)
	}
}
