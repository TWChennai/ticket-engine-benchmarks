package daos

import "db"

func GetBookedSeats(sessionID string) (seats []string, err error) {

	conn := db.GetConn()

	err = conn.Select(&seats, "select booked_seat from order_seats where session_id=$1", sessionID)
	return
}
