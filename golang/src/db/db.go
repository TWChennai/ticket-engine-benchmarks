package db

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var db *sqlx.DB

func InitDB() {
	var err error
	db, err = sqlx.Connect("postgres", "user=postgres dbname=tickets sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}

	db.DB.SetMaxIdleConns(10)
	db.DB.SetMaxOpenConns(40)
}

func GetConn() *sqlx.DB {
	return db
}
