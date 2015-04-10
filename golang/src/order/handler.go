package order

import (
	"constants"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"order/dtos"
	"order/models"
	"order/services"
)

func CreateOrder(w http.ResponseWriter, r *http.Request) {

	content, err := ioutil.ReadAll(r.Body)
	if err != nil {
		errorResponse(err, constants.BAD_REQUEST, http.StatusBadRequest, w)
		return
	}
	orderDTO := dtos.OrderDTO{}
	err = json.Unmarshal(content, &orderDTO)
	if err != nil {
		errorResponse(err, constants.BAD_REQUEST, http.StatusBadRequest, w)
		return
	}

	order := buildOrder(orderDTO)

	err = services.Store(order)
	if err != nil {
		errorResponse(err, constants.INTERNAL_SERVER_ERROR, http.StatusInternalServerError, w)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func buildOrder(orderDTO dtos.OrderDTO) *models.Order {
	var orderSeats []*models.OrderSeat

	for _, seat := range orderDTO.Seats {
		orderSeat := &models.OrderSeat{
			SessionID:  orderDTO.SessionID,
			BookedSeat: seat,
		}

		orderSeats = append(orderSeats, orderSeat)
	}

	order := &models.Order{
		OrderSeats: orderSeats,
	}

	return order
}

func errorResponse(err error, message string, statusCode int, w http.ResponseWriter) {
	log.Printf(message, err)
	w.WriteHeader(statusCode)
}
