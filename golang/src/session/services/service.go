package services

import (
	"constants"
	"helpers"
	"session/daos"
)

func GetAvailableSeats(sessionID string) (seats []string, err error) {
	seats = constants.ALL_SEATS

	bookedSeats, err := daos.GetBookedSeats(sessionID)
	if err != nil {
		return
	}

	seats = helpers.Diff(seats, bookedSeats)
	return
}
