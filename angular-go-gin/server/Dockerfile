FROM golang:1.23.3-alpine3.20

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Expose port
EXPOSE 5000

# Run the application
CMD ["./main"]