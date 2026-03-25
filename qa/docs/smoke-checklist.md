# Smoke Checklist

## Purpose
This smoke checklist verifies that the most critical TaskManager features work at a basic level before deeper manual, API, or automation testing begins.

## Scope
This checklist covers:
- app accessibility
- registration and login
- authenticated task actions
- logout
- protected route behavior

## Environment
- Application: TaskManager API + browser UI
- Frontend: `wwwroot/index.html`
- Backend: ASP.NET Core Web API
- Database: SQLite
- Auth: JWT Bearer token

## Test Data
Use a fresh username when needed, for example:
- username: `qa_user_001`
- password: `Pass1234!`

---

## Smoke Test Cases

### SMK-001 — App/UI loads
**Goal:** Verify the browser UI loads successfully.

**Steps**
1. Start the application
2. Open the browser UI
3. Observe the page layout

**Expected Result**
- Page loads without crash
- Auth section is visible
- Tasks section is visible
- Login/Register controls are visible
- No obvious JavaScript error blocks basic usage

**Priority**
Critical

---

### SMK-002 — Register a new user
**Goal:** Verify a new account can be created.

**Steps**
1. Enter a new username
2. Enter a password
3. Click `Register`

**Expected Result**
- Registration succeeds
- Success message appears
- No server error is shown

**Priority**
Critical

---

### SMK-003 — Login with valid credentials
**Goal:** Verify a registered user can log in.

**Steps**
1. Enter a valid username
2. Enter the correct password
3. Click `Login`

**Expected Result**
- Login succeeds
- Auth status shows signed-in user
- Token is stored/displayed in debug token area
- Task controls become enabled

**Priority**
Critical

---

### SMK-004 — Protected task area is usable after login
**Goal:** Verify authenticated task actions are available.

**Steps**
1. Log in successfully
2. Observe task controls

**Expected Result**
- `Create Task` button is enabled
- `Refresh` button is enabled
- User appears signed in

**Priority**
High

---

### SMK-005 — Create a task
**Goal:** Verify an authenticated user can create a task.

**Steps**
1. Log in
2. Enter a valid task title
3. Optionally enter a description
4. Click `Create Task`

**Expected Result**
- Task creation succeeds
- Success message appears
- Task can later be retrieved from task list

**Priority**
Critical

---

### SMK-006 — Load task list
**Goal:** Verify tasks can be retrieved after login.

**Steps**
1. Log in
2. Click `Refresh`

**Expected Result**
- Task list loads without crashing
- Existing tasks are shown, or a valid empty-state message appears
- No obvious data-format/UI error occurs

**Priority**
Critical

**Notes**
This case is especially important because current code inspection suggests a likely backend/frontend response mismatch for task listing.

---

### SMK-007 — Toggle task completion
**Goal:** Verify a task’s completion state can be changed.

**Steps**
1. Log in
2. Ensure at least one task exists
3. Click the toggle action for a task

**Expected Result**
- Task state changes between pending/completed
- Updated state is reflected after refresh
- No error message appears

**Priority**
High

---

### SMK-008 — Delete a task
**Goal:** Verify a task can be removed.

**Steps**
1. Log in
2. Ensure at least one task exists
3. Click `Delete` on a task
4. Refresh task list if needed

**Expected Result**
- Delete succeeds
- Task is removed from visible list
- No server/UI error occurs

**Priority**
High

---

### SMK-009 — Logout clears session
**Goal:** Verify logout removes authenticated state.

**Steps**
1. Log in
2. Click `Logout`

**Expected Result**
- Auth state changes to signed out
- Task buttons become disabled
- Task list is cleared
- Token is removed from debug/token display

**Priority**
Critical

---

### SMK-010 — Unauthenticated task access is rejected
**Goal:** Verify protected task endpoints cannot be used without auth.

**Steps**
1. Ensure user is logged out
2. Attempt to access `/api/tasks` without token

**Expected Result**
- Request is rejected with unauthorized response
- Protected data is not returned

**Priority**
Critical

---

## Smoke Execution Result Template

Use this table each time you run smoke testing.

| ID | Test Case | Result | Notes / Defect ID |
|---|---|---|---|
| SMK-001 | App/UI loads | Not Run | |
| SMK-002 | Register a new user | Not Run | |
| SMK-003 | Login with valid credentials | Not Run | |
| SMK-004 | Protected task area is usable after login | Not Run | |
| SMK-005 | Create a task | Not Run | |
| SMK-006 | Load task list | Not Run | |
| SMK-007 | Toggle task completion | Not Run | |
| SMK-008 | Delete a task | Not Run | |
| SMK-009 | Logout clears session | Not Run | |
| SMK-010 | Unauthenticated task access is rejected | Not Run | |

---

## Exit Criteria
Smoke testing is considered passed only if all critical cases succeed:
- SMK-001
- SMK-002
- SMK-003
- SMK-005
- SMK-006
- SMK-009
- SMK-010

If any critical smoke test fails, deeper testing should pause until the issue is understood or logged.