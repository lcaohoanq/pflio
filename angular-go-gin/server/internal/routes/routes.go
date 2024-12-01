package routes

import (
	"lcaohoanq/pfolio/server/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	// Public routes
	api.GET("/profile", handlers.GetProfile)
}
