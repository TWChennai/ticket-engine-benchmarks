package models

type Session struct {
	ID   string `db:"id"`
	Name string `db:"name"`
}
