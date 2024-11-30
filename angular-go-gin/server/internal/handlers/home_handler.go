package handlers

import (
	"github.com/gin-gonic/gin"
)

type HomeResponse struct {
	Message string `json:"message"`
	Status  bool   `json:"status"`
}

func GetHome(c *gin.Context) {
	response := HomeResponse{
		Message: "Welcome to the Portfolio API",
		Status:  true,
	}
	c.JSON(200, response)
}
