package services

import (
	"order/daos"
	"order/models"
)

func Store(order *models.Order) (err error) {
	err = daos.SaveOrder(order)
	return
}
