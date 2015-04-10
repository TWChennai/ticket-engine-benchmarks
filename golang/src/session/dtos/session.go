package dtos

type SessionDTO struct {
	ID    string   `json:"session_id"`
	Seats []string `json:"seats"`
}
