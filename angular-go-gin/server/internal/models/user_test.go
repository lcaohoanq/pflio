package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserModel(t *testing.T) {
	// Test Role Constants
	t.Run("Role Constants", func(t *testing.T) {
		assert.Equal(t, Role("MEMBER"), MEMBER)
		assert.Equal(t, Role("STAFF"), STAFF)
		assert.Equal(t, Role("MANAGER"), MANAGER)
	})

	// Test User Creation
	t.Run("User Creation", func(t *testing.T) {
		user := User{
			Name:     "John Doe",
			Email:    "john.doe@example.com",
			Password: "hashedpassword123",
			Role:     MEMBER,
		}

		assert.Equal(t, "John Doe", user.Name)
		assert.Equal(t, "john.doe@example.com", user.Email)
		assert.Equal(t, MEMBER, user.Role)
	})

	// Test User Validation
	t.Run("User Validation", func(t *testing.T) {
		testCases := []struct {
			name        string
			user        User
			expectError bool
		}{
			{
				name: "Valid User",
				user: User{
					Name:     "Valid User",
					Email:    "valid@example.com",
					Password: "strongpassword",
					Role:     STAFF,
				},
				expectError: false,
			},
			{
				name: "Invalid Role",
				user: User{
					Name:     "Invalid Role User",
					Email:    "invalid@example.com",
					Password: "password",
					Role:     "INVALID_ROLE",
				},
				expectError: true,
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				// In a real scenario, you'd use a validation library or custom validation
				isValid := isValidRole(tc.user.Role)
				assert.Equal(t, !tc.expectError, isValid)
			})
		}
	})

	// Test User-Todo Relationship
	t.Run("User-Todo Relationship", func(t *testing.T) {
		user := User{
			Name:  "Todo Owner",
			Email: "todo.owner@example.com",
			Todos: []Todo{
				{
					Body:      "First Todo",
					Completed: false,
				},
				{
					Body:      "Second Todo",
					Completed: true,
				},
			},
		}

		assert.Len(t, user.Todos, 2)
		assert.Equal(t, "First Todo", user.Todos[0].Body)
		assert.Equal(t, "Second Todo", user.Todos[1].Body)
	})
}

// Helper function to validate role (mock implementation)
func isValidRole(role Role) bool {
	switch role {
	case MEMBER, STAFF, MANAGER:
		return true
	default:
		return false
	}
}
