package dtos

type OrderDTO struct {
	SessionID int      `json:"session_id"`
	Seats     []string `json:"seats"`
}
