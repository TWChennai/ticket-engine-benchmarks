package session

import (
	"constants"
	"errors"
	"helpers"
	"log"
	"net/http"
	"session/dtos"
	"session/services"
)

func GetSession(w http.ResponseWriter, r *http.Request) {
	matches := Regexp.FindStringSubmatch(r.RequestURI)
	if len(matches) != 2 {
		errorResponse(errors.New("Regexp parse error"), constants.BAD_REQUEST, http.StatusBadRequest, w)
		return
	}

	sessionID := matches[1]

	seats, err := services.GetAvailableSeats(sessionID)
	if err != nil {
		errorResponse(err, constants.INTERNAL_SERVER_ERROR, http.StatusInternalServerError, w)
		return
	}

	sessionDTO := dtos.SessionDTO{
		ID:    sessionID,
		Seats: seats,
	}

	err = helpers.WriteJSON(sessionDTO, w)
	if err != nil {
		errorResponse(err, constants.INTERNAL_SERVER_ERROR, http.StatusInternalServerError, w)
		return
	}
}

func errorResponse(err error, message string, statusCode int, w http.ResponseWriter) {
	log.Printf(message, err)
	w.WriteHeader(statusCode)
}
