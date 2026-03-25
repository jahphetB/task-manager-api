# Test Scenarios

## Purpose
This document lists high-level testing scenarios for the TaskManager application. These scenarios are used to guide manual testing, API testing, and later automation.

## Scope
The scenarios cover:
- authentication
- session state
- task CRUD
- authorization
- filtering and paging
- UI/API integration behavior

## Scenario ID Format
- AUTH = authentication scenarios
- TASK = task management scenarios
- SEC = security/authorization scenarios
- UI = browser UI scenarios
- API = API-specific behavior scenarios

---

# Authentication Scenarios

## AUTH-001 — Register with valid username and password
**Goal:** Verify a new user can create an account successfully.

## AUTH-002 — Register with missing username
**Goal:** Verify registration fails when username is missing.

## AUTH-003 — Register with missing password
**Goal:** Verify registration fails when password is missing.

## AUTH-004 — Register with duplicate username
**Goal:** Verify duplicate usernames are rejected.

## AUTH-005 — Login with valid credentials
**Goal:** Verify a registered user can log in and receive a token.

## AUTH-006 — Login with wrong password
**Goal:** Verify login fails with invalid password.

## AUTH-007 — Login with non-existing username
**Goal:** Verify login fails for unknown user.

## AUTH-008 — Login response contains token
**Goal:** Verify successful login returns a usable JWT token.

## AUTH-009 — Logout clears local session state
**Goal:** Verify logout removes token, username, and signed-in UI state.

## AUTH-010 — Session is restored on page reload if token exists
**Goal:** Verify the UI loads existing session state from localStorage.

---

# Security / Authorization Scenarios

## SEC-001 — Access task list without token
**Goal:** Verify `GET /api/tasks` is rejected when unauthenticated.

## SEC-002 — Create task without token
**Goal:** Verify `POST /api/tasks` is rejected when unauthenticated.

## SEC-003 — Update task without token
**Goal:** Verify `PUT /api/tasks/{id}` is rejected when unauthenticated.

## SEC-004 — Delete task without token
**Goal:** Verify `DELETE /api/tasks/{id}` is rejected when unauthenticated.

## SEC-005 — Access task endpoints with invalid token
**Goal:** Verify invalid bearer token is rejected.

## SEC-006 — User A cannot view User B tasks in list
**Goal:** Verify task list is restricted to the authenticated user.

## SEC-007 — User A cannot retrieve User B task by ID
**Goal:** Verify cross-user task access is blocked.

## SEC-008 — User A cannot update User B task
**Goal:** Verify cross-user update is blocked.

## SEC-009 — User A cannot delete User B task
**Goal:** Verify cross-user delete is blocked.

---

# Task API Scenarios

## TASK-001 — Create task with valid title
**Goal:** Verify authenticated user can create a task successfully.

## TASK-002 — Create task with valid title and description
**Goal:** Verify description is accepted when provided.

## TASK-003 — Create task with empty title
**Goal:** Verify task creation fails when title is empty.

## TASK-004 — Create task with spaces-only title
**Goal:** Verify whitespace-only title is rejected.

## TASK-005 — Retrieve current user task list
**Goal:** Verify authenticated user can retrieve their own tasks.

## TASK-006 — Retrieve one existing owned task by ID
**Goal:** Verify owned task details can be retrieved.

## TASK-007 — Retrieve non-existing task by ID
**Goal:** Verify unknown task ID returns not found.

## TASK-008 — Update owned task title/description/completion
**Goal:** Verify authenticated user can fully update their own task.

## TASK-009 — Update task with empty title
**Goal:** Verify update fails when title is empty.

## TASK-010 — Delete owned task
**Goal:** Verify authenticated user can delete their own task.

## TASK-011 — Deleted task is no longer retrievable
**Goal:** Verify deleted task is removed from later reads.

---

# Pagination and Filter Scenarios

## API-001 — Get tasks with default paging values
**Goal:** Verify task list works with default `page` and `pageSize`.

## API-002 — Get tasks with custom `page` and `pageSize`
**Goal:** Verify paging parameters are accepted.

## API-003 — Get tasks with `page=0`
**Goal:** Verify invalid page value is normalized safely.

## API-004 — Get tasks with `pageSize=0`
**Goal:** Verify invalid page size is normalized safely.

## API-005 — Get tasks with very large `pageSize`
**Goal:** Verify page size upper bound is enforced.

## API-006 — Filter tasks with `isCompleted=true`
**Goal:** Verify completed-task filtering works.

## API-007 — Filter tasks with `isCompleted=false`
**Goal:** Verify incomplete-task filtering works.

## API-008 — Task list response shape matches app expectations
**Goal:** Verify actual API response format matches documented and frontend-expected structure.

---

# Browser UI Scenarios

## UI-001 — Browser UI loads successfully
**Goal:** Verify main page loads and main controls are visible.

## UI-002 — Register through UI
**Goal:** Verify user registration works from browser.

## UI-003 — Login through UI
**Goal:** Verify login works from browser and updates signed-in state.

## UI-004 — Logged-out state disables task actions
**Goal:** Verify task actions are not usable before login.

## UI-005 — Logged-in state enables task actions
**Goal:** Verify task actions become usable after login.

## UI-006 — Create task through UI
**Goal:** Verify task creation works from browser.

## UI-007 — Refresh task list through UI
**Goal:** Verify tasks can be loaded in browser without error.

## UI-008 — Task list renders correctly after load
**Goal:** Verify task cards display title, description, and status correctly.

## UI-009 — Toggle task status through UI
**Goal:** Verify user can mark task completed/pending from browser.

## UI-010 — Delete task through UI
**Goal:** Verify user can delete task from browser.

## UI-011 — Logout clears task list in UI
**Goal:** Verify logging out clears visible task data.

## UI-012 — Invalid/expired session is handled gracefully
**Goal:** Verify UI warns the user and resets state if protected request returns unauthorized.

---

# Integration / Contract Scenarios

## INT-001 — README task list example matches live API response
**Goal:** Verify documentation matches actual endpoint behavior.

## INT-002 — Frontend task rendering matches backend response contract
**Goal:** Verify the browser can correctly consume the task list response.

## INT-003 — Toggle flow works with current list response format
**Goal:** Verify toggle behavior works end-to-end after retrieving tasks.

## INT-004 — Page metadata displays correct values
**Goal:** Verify UI page summary is correct after loading tasks.

---

# Suggested First Execution Order

## Round 1: smoke / core health
1. UI-001
2. AUTH-001
3. AUTH-005
4. UI-005
5. TASK-001
6. UI-007
7. UI-009
8. UI-010
9. AUTH-009
10. SEC-001

## Round 2: security and ownership
1. SEC-002
2. SEC-003
3. SEC-004
4. SEC-006
5. SEC-007
6. SEC-008
7. SEC-009

## Round 3: validation and edge behavior
1. AUTH-002
2. AUTH-003
3. AUTH-004
4. AUTH-006
5. AUTH-007
6. TASK-003
7. TASK-004
8. TASK-009
9. API-003
10. API-004
11. API-005

## Round 4: integration mismatch investigation
1. API-008
2. INT-001
3. INT-002
4. INT-003
5. INT-004

---

## Notes
These are still high-level scenarios. The next document will convert the most important ones into detailed test cases with:
- preconditions
- test steps
- test data
- expected results
- actual result
- pass/fail