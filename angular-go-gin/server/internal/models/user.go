package models

import (
	"gorm.io/gorm"
)

type Role string

const (
	MEMBER  Role = "MEMBER"
	STAFF   Role = "STAFF"
	MANAGER Role = "MANAGER"
)

type User struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null"`
	Email    string `json:"email" gorm:"uniqueIndex;not null"`
	Password string `json:"password" gorm:"not null"`
	Avatar   string `json:"avatar" gorm:"type:text"`
	Role     Role   `json:"role" gorm:"type:varchar(10);default:'MEMBER'"`
	Todos    []Todo `json:"todos,omitempty" gorm:"foreignKey:UserID"`
}
