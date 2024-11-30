package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestTodoModel(t *testing.T) {
	// Test Todo Creation
	t.Run("Todo Creation", func(t *testing.T) {
		todo := Todo{
			Body:      "Complete project",
			Completed: false,
			UserID:    1,
		}

		assert.Equal(t, "Complete project", todo.Body)
		assert.False(t, todo.Completed)
		assert.Equal(t, uint(1), todo.UserID)
	})

	// Test Todo Completion
	t.Run("Todo Completion", func(t *testing.T) {
		todo := Todo{
			Body:      "Test Todo",
			Completed: false,
		}

		todo.Completed = true
		assert.True(t, todo.Completed)
	})

	// Test Todo-User Relationship
	t.Run("Todo-User Relationship", func(t *testing.T) {
		user := User{
			Name:  "Test User",
			Email: "test@example.com",
		}

		todo := Todo{
			Body:      "User's Todo",
			Completed: false,
			User:      user,
		}

		assert.Equal(t, "Test User", todo.User.Name)
		assert.Equal(t, "test@example.com", todo.User.Email)
	})

	// Test Todo Validation
	t.Run("Todo Validation", func(t *testing.T) {
		testCases := []struct {
			name        string
			todo        Todo
			expectValid bool
		}{
			{
				name: "Valid Todo",
				todo: Todo{
					Body:      "Valid todo item",
					Completed: false,
					UserID:    1,
				},
				expectValid: true,
			},
			{
				name: "Empty Body Todo",
				todo: Todo{
					Body:      "",
					Completed: false,
					UserID:    1,
				},
				expectValid: false,
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				isValid := isValidTodo(tc.todo)
				assert.Equal(t, tc.expectValid, isValid)
			})
		}
	})
}

// Helper function to validate todo (mock implementation)
func isValidTodo(todo Todo) bool {
	return todo.Body != ""
}
