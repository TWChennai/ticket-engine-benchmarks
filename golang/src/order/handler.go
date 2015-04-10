package order

import (
	"constants"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"order/dtos"
)

func CreateOrder(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadAll(r.Body)
	if err != nil {
		errorResponse(err, constants.BAD_REQUEST, http.StatusBadRequest, w)
		return
	}
	orderDTO := &dtos.OrderDTO{}
	err = json.Unmarshal(content, orderDTO)
	if err != nil {
		errorResponse(err, constants.BAD_REQUEST, http.StatusBadRequest, w)
		return
	}

	// err = helpers.WriteJSON(sessionDTO, w)
	// if err != nil {
	// 	errorResponse(err, constants.INTERNAL_SERVER_ERROR, http.StatusInternalServerError, w)
	// 	return
	// }
}

func errorResponse(err error, message string, statusCode int, w http.ResponseWriter) {
	log.Printf(message, err)
	w.WriteHeader(statusCode)
}
