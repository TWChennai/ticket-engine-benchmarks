package helpers

import (
	"encoding/json"
	"net/http"
)

func WriteJSON(obj interface{}, w http.ResponseWriter) error {
	content, err := json.Marshal(obj)
	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(content)
	if err != nil {
		return err
	}

	return nil
}
