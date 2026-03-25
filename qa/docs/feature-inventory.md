# Feature Inventory

## Purpose
This document lists the main features of the TaskManager application, the parts of the system involved, and the relative testing priority. It is the starting point for manual testing, API testing, and automation planning.

## Project Under Test
TaskManager is a small ASP.NET Core web application with:
- JWT-based authentication
- per-user task ownership
- task CRUD API
- a small browser UI in `wwwroot`

---

## Feature 1: User Registration

### Description
A new user can create an account by submitting a username and password.

### Related backend files
- `Controllers/AuthController.cs`
- `Dtos/RegisterRequest.cs`
- `Models/User.cs`

### Related endpoint
- `POST /api/auth/register`

### Related UI parts
- Username input
- Password input
- Register button

### Expected behavior
- Registration succeeds when username and password are provided
- Duplicate username is rejected
- Missing username or password is rejected
- Password is not stored in plain text

### Priority
High

### Main risks
- Duplicate account handling
- Missing input validation
- Password security mistakes

---

## Feature 2: User Login

### Description
A registered user can log in and receive a JWT token.

### Related backend files
- `Controllers/AuthController.cs`
- `Dtos/LoginRequest.cs`

### Related endpoint
- `POST /api/auth/login`

### Related UI parts
- Username input
- Password input
- Login button
- Auth status chip
- Token preview section

### Expected behavior
- Valid credentials return a token
- Invalid username/password returns unauthorized
- UI stores token and updates logged-in state

### Priority
High

### Main risks
- Wrong credential handling
- Missing token in response
- Session/token storage issues

---

## Feature 3: Authenticated Session State

### Description
The browser UI should reflect whether the user is signed in or signed out.

### Related frontend files
- `wwwroot/app.js`
- `wwwroot/index.html`

### Related behavior
- Token saved to localStorage
- Username saved to localStorage
- Logout clears session info
- Buttons enable/disable based on auth state

### Expected behavior
- Signed-in user sees auth status
- Logged-out user cannot use task actions
- Logout clears task list and token

### Priority
High

### Main risks
- Stale token state
- Logout not clearing UI properly
- UI and auth state getting out of sync

---

## Feature 4: Create Task

### Description
An authenticated user can create a new task with title and optional description.

### Related backend files
- `Controllers/TasksController.cs`
- `Dtos/TaskCreateRequest.cs`
- `Models/TaskItem.cs`

### Related endpoint
- `POST /api/tasks`

### Related UI parts
- Task title input
- Task description input
- Create Task button

### Expected behavior
- Title is required
- Description is optional
- New task belongs to the logged-in user
- Created task can later be retrieved

### Priority
High

### Main risks
- Missing title validation
- Task not linked to correct user
- UI not refreshing after create

---

## Feature 5: List My Tasks

### Description
An authenticated user can retrieve only their own tasks.

### Related backend files
- `Controllers/TasksController.cs`
- `Dtos/TaskResponse.cs`
- `Dtos/PagedResult.cs`

### Related endpoint
- `GET /api/tasks`
- Query params: `page`, `pageSize`, `isCompleted`

### Related UI parts
- Refresh button
- Page input
- Page size input
- Completed filter dropdown
- Task list area
- Page metadata area

### Expected behavior
- Only the signed-in user’s tasks are returned
- Filtering by completion should work
- Page and pageSize should influence returned results
- UI should render tasks correctly

### Priority
High

### Main risks
- Ownership violations
- Filtering not applied correctly
- Pagination mismatch between backend and frontend
- Empty state handling

### Notes
Current code inspection suggests a likely contract mismatch:
- frontend expects a paged object with fields like `items`, `page`, `totalItems`
- backend currently returns a plain list from `GET /api/tasks`

This is a likely defect candidate and should be tested early.

---

## Feature 6: View One Task

### Description
An authenticated user can retrieve a single task by ID, but only if it belongs to them.

### Related backend files
- `Controllers/TasksController.cs`

### Related endpoint
- `GET /api/tasks/{id}`

### Expected behavior
- Existing owned task returns task details
- Non-existing task returns not found
- Another user’s task is not accessible

### Priority
High

### Main risks
- Broken authorization/ownership
- Wrong status code behavior

---

## Feature 7: Update Task

### Description
An authenticated user can update title, description, and completion status of their own task.

### Related backend files
- `Controllers/TasksController.cs`
- `Dtos/TaskUpdateRequest.cs`

### Related endpoint
- `PUT /api/tasks/{id}`

### Related UI parts
- Toggle complete button

### Expected behavior
- Title is required
- User can update only their own task
- Completion state changes correctly
- Successful update returns no content

### Priority
High

### Main risks
- Ownership mistakes
- Invalid title handling
- UI toggle behavior failing

---

## Feature 8: Delete Task

### Description
An authenticated user can delete one of their tasks.

### Related backend files
- `Controllers/TasksController.cs`

### Related endpoint
- `DELETE /api/tasks/{id}`

### Related UI parts
- Delete button on each task

### Expected behavior
- User can delete only their own task
- Deleted task no longer appears in later task loads
- Successful delete returns no content

### Priority
High

### Main risks
- Ownership mistakes
- UI not refreshing after delete
- Wrong task removed from UI

---

## Feature 9: Unauthorized Access Protection

### Description
Task endpoints require a valid JWT token.

### Related backend files
- `Program.cs`
- `Controllers/TasksController.cs`

### Related behavior
- `[Authorize]` protects task controller
- JWT validation is configured in authentication middleware

### Expected behavior
- Missing token is rejected
- Invalid token is rejected
- Expired token is rejected
- Protected endpoints are inaccessible without authentication

### Priority
Critical

### Main risks
- Security misconfiguration
- Protected endpoints accidentally exposed
- Invalid token accepted

---

## Feature 10: Swagger API Access

### Description
Swagger is enabled in development and should allow interactive API testing.

### Related backend files
- `Program.cs`

### Expected behavior
- Swagger UI loads in development
- Auth can be tested through Swagger
- Bearer token can be entered through Authorize button

### Priority
Medium

### Main risks
- Swagger auth config mismatch
- API hard to verify manually if Swagger setup breaks

---

## Overall Test Priority Summary

### Critical / High priority
1. Registration
2. Login
3. Auth/session state
4. Unauthorized access protection
5. Create task
6. List my tasks
7. Update task
8. Delete task
9. Ownership enforcement

### Medium priority
1. Swagger usability
2. Filter behavior details
3. Page/pageSize edge behavior
4. UI messages and empty-state display

---

## Known Areas to Investigate Early
1. Frontend expects paged task response object
2. Backend currently returns plain list for `GET /api/tasks`
3. UI task rendering/toggling may fail because of this mismatch
4. README behavior may not match current controller behavior