package daos

import (
	"code.google.com/p/go-uuid/uuid"
	"db"
	"order/models"
	"time"
)

func SaveOrder(order *models.Order) (err error) {
	conn := db.GetConn()

	tx := conn.MustBegin()

	order.ID = uuid.New()
	order.CreatedAT = time.Now()
	tx.Exec("INSERT into orders(id, create_at) values($1, $2)", order.ID, order.CreatedAT)
	for _, orderSeat := range order.OrderSeats {
		tx.Exec("INSERT into order_seats(id, booked_seat, session_id) values($1, $2, $3)", order.ID, orderSeat.BookedSeat, orderSeat.SessionID)
	}

	return tx.Commit()
}
