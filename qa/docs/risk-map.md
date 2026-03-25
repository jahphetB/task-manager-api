# Risk Map

## Purpose
This document identifies the highest-risk areas in the TaskManager application and explains why they should be tested early. It helps prioritize manual testing, API testing, and automation work.

## Risk Rating Guide
- Likelihood: Low / Medium / High
- Impact: Low / Medium / High / Critical
- Priority: Low / Medium / High / Critical

---

## Risk 1: Authentication failure or misbehavior

### Area
User registration, login, JWT issuance, signed-in session state

### Why this is risky
If authentication fails, users cannot access the app correctly. If login succeeds without a valid token, protected API behavior becomes unreliable.

### Likelihood
Medium

### Impact
Critical

### Priority
Critical

### What to test
- Register with valid input
- Register with missing input
- Register duplicate username
- Login with valid credentials
- Login with wrong password
- Login with non-existing username
- Verify token is returned after login
- Verify logout clears session state

---

## Risk 2: Unauthorized access to protected task endpoints

### Area
`/api/tasks` endpoints protected by JWT auth

### Why this is risky
If protected endpoints are exposed, that is a serious security problem.

### Likelihood
Medium

### Impact
Critical

### Priority
Critical

### What to test
- Call `GET /api/tasks` without token
- Call `POST /api/tasks` without token
- Call `PUT /api/tasks/{id}` without token
- Call `DELETE /api/tasks/{id}` without token
- Call task endpoints with invalid token
- Call task endpoints with expired token if possible later

---

## Risk 3: Per-user task ownership failure

### Area
Task CRUD behavior tied to authenticated user identity

### Why this is risky
A user must never read, update, or delete another user’s tasks. This is one of the most important business/security rules in the app.

### Likelihood
Medium

### Impact
Critical

### Priority
Critical

### What to test
- User A creates tasks
- User B logs in separately
- User B cannot see User A tasks in task list
- User B cannot retrieve User A task by ID
- User B cannot update User A task
- User B cannot delete User A task

---

## Risk 4: Frontend/backend response contract mismatch

### Area
Task list API response vs browser UI expectations

### Why this is risky
Current code inspection suggests the frontend expects a paged response object with fields like `items`, `page`, `totalItems`, and `totalPages`, but the backend currently returns only a plain list for `GET /api/tasks`.

### Likelihood
High

### Impact
High

### Priority
Critical

### What to test
- Login and load tasks from UI
- Create a task, then refresh from UI
- Check whether tasks render correctly
- Check whether page metadata is correct
- Check whether toggle action works after loading tasks

### Notes
This is the strongest early defect candidate based on code inspection.

---

## Risk 5: Task creation/update validation problems

### Area
Title validation and request handling for create/update actions

### Why this is risky
Tasks without valid titles should not be accepted. Validation mistakes can lead to bad data and inconsistent behavior between UI and API.

### Likelihood
Medium

### Impact
High

### Priority
High

### What to test
- Create task with empty title
- Create task with spaces only title
- Update task with empty title
- Update task with spaces only title
- Create task with description omitted
- Create task with long title/description later as edge case

---

## Risk 6: UI session state and localStorage issues

### Area
Frontend auth state, token storage, logout behavior

### Why this is risky
The UI depends on localStorage to remember the token and username. If UI state and real auth state get out of sync, the app becomes confusing or misleading.

### Likelihood
Medium

### Impact
High

### Priority
High

### What to test
- Login stores token
- Refresh page after login keeps signed-in state
- Logout removes token and clears task list
- Invalid/expired token causes proper warning and logout
- Buttons enable/disable correctly based on auth state

---

## Risk 7: Toggle task completion behavior

### Area
Frontend toggle action + backend update endpoint

### Why this is risky
The toggle flow depends on loading the task list first and locating the task in `data.items`. If the response shape is wrong, toggle can fail even if backend update logic is correct.

### Likelihood
High

### Impact
High

### Priority
High

### What to test
- Toggle a pending task to completed
- Toggle a completed task to pending
- Verify state after refresh
- Try toggle when UI cannot locate task from current page

---

## Risk 8: Delete behavior and UI refresh consistency

### Area
Delete endpoint and frontend task refresh

### Why this is risky
Delete might succeed in backend but fail to update in UI, which creates confusion and false bug reports.

### Likelihood
Medium

### Impact
Medium

### Priority
High

### What to test
- Delete existing task
- Verify deleted task disappears after refresh
- Delete non-existing task by API
- Verify correct message is shown in UI on success/failure

---

## Risk 9: Pagination and filter behavior

### Area
`page`, `pageSize`, `isCompleted` query parameters

### Why this is risky
The API accepts paging and filtering inputs, and the UI exposes those controls. Incorrect handling may cause confusing results or metadata.

### Likelihood
Medium

### Impact
Medium

### Priority
Medium

### What to test
- `page=1`, `pageSize=5`
- invalid small values like `page=0`, `pageSize=0`
- very large `pageSize`
- `isCompleted=true`
- `isCompleted=false`
- empty filter / all tasks

### Notes
Backend clamps some invalid values, so this is a good area for API behavior checks.

---

## Risk 10: API documentation / README mismatch

### Area
README behavior vs actual backend behavior

### Why this is risky
If docs claim paged responses but the live endpoint returns plain lists, users and testers will misunderstand expected behavior.

### Likelihood
High

### Impact
Medium

### Priority
Medium

### What to test
- Compare actual API responses to README examples
- Identify mismatches clearly in bug reports or improvement notes

---

## Priority Summary

### Test first
1. Authentication
2. Unauthorized access protection
3. Per-user ownership
4. Frontend/backend list response mismatch
5. Create/update validation
6. UI login/session state

### Test second
1. Toggle/delete behavior
2. Pagination/filter behavior
3. Documentation mismatch

---

## Early Defect Targets
These are the first issues most likely to produce real bugs:
1. Task list rendering in UI
2. Task toggle from UI
3. Page metadata display
4. README example response mismatch
5. Unauthorized and ownership checks