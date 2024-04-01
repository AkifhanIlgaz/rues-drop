package models

import (
	"time"
)

type Project struct {
	Name      string    `json:"projectName" bson:"name"`
	Website   string    `json:"website"`
	Discord   string    `json:"discord"`
	Twitter   string    `json:"twitter"`
	Logo      string    `json:"logo"`
	CreatedAt time.Time `json:"createdAt"`
}
