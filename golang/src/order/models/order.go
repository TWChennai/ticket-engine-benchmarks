package models

import "time"

type Order struct {
	ID         string       `db:"id"`
	CreatedAT  time.Time    `db:"create_at"`
	OrderSeats []*OrderSeat `db:"-"`
}

type OrderSeat struct {
	ID         int    `db:"id"`
	BookedSeat string `db:"booked_seat"`
	SessionID  int    `db:"session_id"`
}
