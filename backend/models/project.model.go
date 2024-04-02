package models

import (
	"time"
)

type Project struct {
	Name      string    `json:"name" bson:"-"`
	Website   string    `json:"website"`
	Discord   string    `json:"discord"`
	Twitter   string    `json:"twitter"`
	Logo      string    `json:"logo"`
	CreatedAt time.Time `json:"createdAt"`
}
