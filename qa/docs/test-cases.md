# Test Cases

## Purpose
This document contains the first batch of detailed manual test cases for the TaskManager application. These test cases are designed to validate the most important user flows and the highest-risk areas first.

## Scope of This First Batch
This batch focuses on:
- registration
- login
- authenticated task creation
- task list loading
- unauthorized access protection
- per-user ownership

## Execution Notes
- Use fresh usernames when needed to avoid duplicate-user conflicts
- Record actual results after each execution
- If a test fails, create a bug report and link the defect ID
- If one critical precondition fails, note blocked downstream tests clearly

## Environment
- Application: TaskManager API + browser UI
- Frontend: `wwwroot/index.html`
- Backend: ASP.NET Core Web API
- Database: SQLite
- Auth: JWT Bearer token

## Suggested Test Data
- User A username: `qa_user_a_001`
- User A password: `Pass1234!`
- User B username: `qa_user_b_001`
- User B password: `Pass1234!`

You can change the numbers if those usernames already exist.

---

# TC-001 — Register a new user with valid input

## Objective
Verify that a new user can register successfully.

## Type
Manual / UI

## Priority
Critical

## Preconditions
- Application is running
- The username does not already exist

## Test Data
- Username: `qa_user_a_001`
- Password: `Pass1234!`

## Steps
1. Open the browser UI
2. Enter `qa_user_a_001` in the Username field
3. Enter `Pass1234!` in the Password field
4. Click `Register`

## Expected Result
- Registration succeeds
- A success message appears
- No server error is shown
- User is not automatically logged in

## Actual Result
Registion succeded
A success message appeared
No server error was shown
User was not automatically logged in

## Status
_Run completed_

## Defect ID
_None_

---

# TC-002 — Register with duplicate username

## Objective
Verify that duplicate usernames are rejected.

## Type
Manual / UI

## Priority
High

## Preconditions
- TC-001 has already been executed successfully
- User `qa_user_a_001` already exists

## Test Data
- Username: `qa_user_a_001`
- Password: `Pass1234!`

## Steps
1. Stay on the browser UI
2. Enter `qa_user_a_001` in the Username field
3. Enter `Pass1234!` in the Password field
4. Click `Register`

## Expected Result
- Registration fails
- An error message appears
- Message indicates duplicate or conflict condition
- No second account is created

## Actual Result
Registration failed
An error message appeared
Register failed: 409 "Username already exists."
No second account was created. 

## Status
_Run completed_

## Defect ID
_None_

---

# TC-003 — Login with valid credentials

## Objective
Verify that a registered user can log in successfully and receive an authenticated UI state.

## Type
Manual / UI

## Priority
Critical

## Preconditions
- User `qa_user_a_001` exists

## Test Data
- Username: `qa_user_a_001`
- Password: `Pass1234!`

## Steps
1. Open the browser UI
2. Enter `qa_user_a_001` in the Username field
3. Enter `Pass1234!` in the Password field
4. Click `Login`

## Expected Result
- Login succeeds
- Auth chip changes to signed-in state
- Logout button becomes enabled
- Create Task button becomes enabled
- Refresh button becomes enabled
- Token appears in the token preview area
- The application attempts to load tasks after login

## Actual Result
Login succeeded
Auth chipe changed to signed-in state
Logout button becomes enabled
Create Task button becomes enabled
Token appeared in the token preview area
The application attempted to load tasks after login

## Status
_Run completed_

## Defect ID
_None_

---

# TC-004 — Login with invalid password

## Objective
Verify that login fails when the password is incorrect.

## Type
Manual / UI

## Priority
High

## Preconditions
- User `qa_user_a_001` exists
- User is logged out before starting this test

## Test Data
- Username: `qa_user_a_001`
- Password: `WrongPass123`

## Steps
1. Open the browser UI
2. Enter `qa_user_a_001` in the Username field
3. Enter `WrongPass123` in the Password field
4. Click `Login`

## Expected Result
- Login fails
- Error message appears
- Auth chip remains signed out
- No token is stored/displayed
- Task actions remain disabled

## Actual Result
Login failed
Error message appeared
Login failed: 401 "Invalid credentials."
Auth chip remained signed out
No token was stored/displayed
Task actions remained disabled

## Status
_Run completed_

## Defect ID
_None_

---

# TC-005 — Create a task after login

## Objective
Verify that an authenticated user can create a task successfully.

## Type
Manual / UI

## Priority
Critical

## Preconditions
- User `qa_user_a_001` is logged in

## Test Data
- Title: `First QA Task`
- Description: `Created during manual testing`

## Steps
1. Log in as `qa_user_a_001`
2. Enter `First QA Task` in the Title field
3. Enter `Created during manual testing` in the Description field
4. Click `Create Task`

## Expected Result
- Task creation succeeds
- Success message appears
- Title and description inputs are cleared
- The application attempts to reload the task list
- The new task should be retrievable afterward

## Actual Result
Task creation succeeded
Success message did not appear
Title and description inputs are cleared
The application attempted to reload the task list
The new task is retrievable. 

## Status
_Run completed_

## Defect ID
_None_

---

# TC-006 — Load task list after creating a task

## Objective
Verify that the task list loads correctly in the UI after a task has been created.

## Type
Manual / UI

## Priority
Critical

## Preconditions
- User `qa_user_a_001` is logged in
- At least one task exists for that user

## Steps
1. Log in as `qa_user_a_001`
2. Click `Refresh`
3. Observe the task list area
4. Observe the page metadata area

## Expected Result
- Task list loads without crash
- At least one created task is displayed in the task list
- The displayed task includes title, description, and current status
- Page metadata displays meaningful values
- No misleading empty-state message appears when tasks exist

## Actual Result
- Task list loaded without crash
- At least one created task is displayed in the task list
- The displayed task includes title, description, and current status
- Page metadata displayed meaningful values
- No misleading empty-state message appeared when tasks exist
- When a second task created and marked completed and then clicked refresh, the page didn't refresh and move the completed task to completed task section. The completed task moved to the completed task section when the whole page was refreshed, not by the button "Refresh".

## Status
_Run completed_

## Defect ID
_None_

## Notes
This is a high-value bug-hunting test. Based on code inspection, the frontend expects a paged response object but the backend currently returns a plain array for `GET /api/tasks`. This test may fail because of that contract mismatch.

---

# TC-007 — Toggle task completion from the UI

## Objective
Verify that a visible task can be marked completed or pending from the browser UI.

## Type
Manual / UI

## Priority
High

## Preconditions
- User `qa_user_a_001` is logged in
- At least one task exists
- The task is visible in the current task list

## Steps
1. Log in as `qa_user_a_001`
2. Click `Refresh`
3. Locate an existing task in the task list
4. Click the toggle button for that task
5. Observe the result
6. Refresh again if needed

## Expected Result
- Toggle action succeeds
- A success message appears
- Task status changes from Pending to Completed, or from Completed to Pending
- Updated status remains consistent after refresh

## Actual Result
- Toggle action succeeded
- A success message appeared
- Task status changed from Pending to Completed, and from Completed to Pending
- Updated status remained consistent after refresh

## Status
_Run completed_

## Defect ID
_None_

## Notes
This test is another strong bug candidate because the frontend toggle flow tries to find the task in `data.items`, but the backend currently appears to return a plain array.

---

# TC-008 — Access task list API without authentication

## Objective
Verify that the protected task list endpoint rejects unauthenticated access.

## Type
Manual / API

## Priority
Critical

## Preconditions
- User is logged out
- No Authorization header is sent

## Endpoint
`GET /api/tasks`

## Steps
1. Open Swagger or another API client
2. Make a `GET /api/tasks` request without bearer token
3. Observe the response

## Expected Result
- Request is rejected
- Response status is unauthorized
- No task data is returned

## Actual Result
Request was rejected
Response status was unauthorized
No task data was returned

## Status
_Run completed_

## Defect ID
_None_

---

# TC-009 — User B cannot see User A tasks

## Objective
Verify that task data is restricted by authenticated user ownership.

## Type
Manual / API or UI+API combined

## Priority
Critical

## Preconditions
- User A exists and has at least one task
- User B exists
- You can log in as each user separately

## Test Data
- User A: `qa_user_a_001` / `Pass1234!`
- User B: `qa_user_b_001` / `Pass1234!`

## Steps
1. Register User A if needed
2. Log in as User A
3. Create at least one task for User A
4. Log out
5. Register User B if needed
6. Log in as User B
7. Load User B task list

## Expected Result
- User B does not see User A tasks
- Only User B tasks, or an empty list, are returned
- No data belonging to User A is exposed

## Actual Result
- User B did not see User A tasks
- Only User B tasks, or an empty list, were returned
- No data belonging to User A was exposed

## Status
_Run completed_

## Defect ID
_None_

---

# TC-010 — Logout clears authenticated state

## Objective
Verify that logout clears the browser session and disables task actions.

## Type
Manual / UI

## Priority
Critical

## Preconditions
- User is currently logged in

## Steps
1. Log in as a valid user
2. Click `Logout`
3. Observe the auth chip
4. Observe the Create Task button
5. Observe the Refresh button
6. Observe the token preview
7. Observe the task list area

## Expected Result
- Auth chip changes to signed-out state
- Logout button becomes disabled
- Create Task button becomes disabled
- Refresh button becomes disabled
- Token preview is cleared or shows no token
- Task list is cleared
- Session data is removed from localStorage

## Actual Result
- Auth chip changed to signed-out state
- Logout button became disabled
- Create Task button became disabled
- Refresh button became disabled
- Token preview was cleared and showed no token
- Task list was cleared
- Session data was removed from localStorage

## Status
_Run completed_

## Defect ID
_None_

---

# Execution Summary Table

| ID | Title | Priority | Status | Defect ID | Notes |
|---|---|---:|---|---|---|
| TC-001 | Register a new user with valid input | Critical | Not Run | None | |
| TC-002 | Register with duplicate username | High | Not Run | None | |
| TC-003 | Login with valid credentials | Critical | Not Run | None | |
| TC-004 | Login with invalid password | High | Not Run | None | |
| TC-005 | Create a task after login | Critical | Not Run | None | |
| TC-006 | Load task list after creating a task | Critical | Not Run | None | Strong early bug candidate |
| TC-007 | Toggle task completion from the UI | High | Not Run | None | Strong early bug candidate |
| TC-008 | Access task list API without authentication | Critical | Not Run | None | |
| TC-009 | User B cannot see User A tasks | Critical | Not Run | None | |
| TC-010 | Logout clears authenticated state | Critical | Not Run | None | |

---

# Exit Rule for This Test Pack
This first test pack should be considered successful only if all critical tests pass or any failures are properly documented with defect reports:
- TC-001
- TC-003
- TC-005
- TC-006
- TC-008
- TC-009
- TC-010