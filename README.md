# TaskManager API (ASP.NET Core)

TaskManager API is a RESTful Web API built with ASP.NET Core and C# that supports user registration/login with JWT authentication and task management with per-user ownership.

## Features
- User registration (password hashing with BCrypt)
- User login (JWT token issuance)
- Task CRUD (Create/Read/Update/Delete)
- Per-user ownership (users can only access their own tasks)
- Pagination + filtering on task lists
- Swagger UI for interactive API testing

## Tech Stack
- C# / .NET
- ASP.NET Core Web API (controllers)
- Entity Framework Core
- SQLite (local dev)
- JWT Bearer Authentication
- Swagger (Swashbuckle)

## Getting Started

### Prerequisites
- .NET SDK (10.x or later)

### Run the API
From the `TaskManager.Api` directory:

```bash
dotnet restore
dotnet run

### 
Open Swagger:

http://localhost:5166/swagger
 (port may vary)

Database (EF Core)
Apply migrations (create/update the database)

From TaskManager.Api:

dotnet ef database update


This creates taskmanager.db locally.

Authentication (JWT)
Register

POST /api/auth/register

Example body:

{
  "username": "yaphet2",
  "password": "pass1234"
}

Login

POST /api/auth/login

Example body:

{
  "username": "yaphet2",
  "password": "pass1234"
}


Login returns a JWT token:

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Use the token in Swagger

Click Authorize (🔒)

Paste: Bearer <your_token>

Call protected endpoints under /api/tasks

Tasks
List my tasks (paged)

GET /api/tasks?page=1&pageSize=10&isCompleted=false

Example response:

{
  "items": [],
  "page": 1,
  "pageSize": 10,
  "totalItems": 0,
  "totalPages": 0
}

Create a task

POST /api/tasks

Example body:

{
  "title": "First task",
  "description": "Created by user"
}

Notes

Passwords are hashed and never stored in plaintext.

Task ownership is enforced using the authenticated user identity from the JWT.

