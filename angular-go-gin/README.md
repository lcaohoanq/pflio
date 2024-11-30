# Let's Go! React with Go Complete Fullstack App - TypeScript, React Query, PostgreSQL, GORM, ChakraUI, Docker

Some Features:

-   ⚙️ Tech Stack: Go, React, TypeScript, PostgreSQL, TanStack Query, GORM, ChakraUI
-   ✅ Create, Read, Update, and Delete (CRUD) functionality for todos
-   😄 Login, Register new user with JWT authentication
-   👍 View User Profile with statistics Dashboard
-   ❕ Support CI-CD with Docker and Github Actions
-   🌓 Light and Dark mode for user interface
-   📱 Responsive design for various screen sizes
-   🌐 Deployment
-   🔄 Real-time data fetching, caching, and updates with TanStack Query
-   🎨 Stylish UI components with ChakraUI
-   ⏳ And much more!

### .env file

```shell
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=todos
DB_PORT=5432
PORT=5000
ENV=development
JWT_SECRET=your-secret-key
```

## Quick build and run (required install Docker)

```shell
cd scripts
chmod +x ./docker_build.sh
./docker_build.sh
```

### Compile and run

```shell
cd client && npm install && npm run dev

# Backend required to start PostgreSQL to migrate
cd ../server
docker compose up -d
go mod tidy
go run main.go
```
