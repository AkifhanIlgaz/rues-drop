package models

type User struct {
	Uid       string   `json:"uid" bson:"uid" binding:"required"`
	Bookmarks []string `json:"bookmarks" bson:"bookmarks,omitempty"`
}
