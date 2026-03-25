# Test Execution Report — Round 1

## Purpose
This report records the first execution of the TaskManager manual test pack and summarizes pass/fail results, blocked tests, and defects found.

## Scope
This execution covered the first manual test batch:
- registration
- login
- task creation
- task list loading
- unauthorized access protection
- task ownership
- logout

## Environment
- Application: TaskManager
- Environment: Local development
- Frontend: `wwwroot/index.html`
- Backend: ASP.NET Core Web API
- Database: SQLite
- Browser: _fill in_
- Date executed: _fill in_

## Test Data Used
- User A: _fill in_
- User B: _fill in_

---

## Execution Summary

| ID | Title | Result | Notes / Defect ID |
|---|---|---|---|
| TC-001 | Register a new user with valid input | _Pass/Fail/Blocked_ | |
| TC-002 | Register with duplicate username | _Pass/Fail/Blocked_ | |
| TC-003 | Login with valid credentials | _Pass/Fail/Blocked_ | |
| TC-004 | Login with invalid password | _Pass/Fail/Blocked_ | |
| TC-005 | Create a task after login | _Pass/Fail/Blocked_ | |
| TC-006 | Load task list after creating a task | _Pass/Fail/Blocked_ | |
| TC-007 | Toggle task completion from the UI | _Pass/Fail/Blocked_ | |
| TC-008 | Access task list API without authentication | _Pass/Fail/Blocked_ | |
| TC-009 | User B cannot see User A tasks | _Pass/Fail/Blocked_ | |
| TC-010 | Logout clears authenticated state | _Pass/Fail/Blocked_ | |

---

## Summary Metrics
- Total executed: 10
- Passed: _fill in_
- Failed: _fill in_
- Blocked: _fill in_
- Defects raised: _fill in_

---

## Key Findings
1. _Fill in the most important finding_
2. _Fill in the second most important finding_
3. _Fill in the third most important finding_

Example:
1. Task creation succeeded, but created tasks did not render correctly in the browser UI.
2. Task toggle behavior failed because the UI could not locate the task from the returned list response.
3. Protected task endpoints correctly rejected unauthenticated access.

---

## Critical Issues Found
List only high-value failures here.

Example:
- BUG-001 — Task list does not render after successful task creation
- BUG-002 — Toggle action fails because UI expects paged response shape

---

## Recommendation
Choose one based on actual result:

### Option A — continue to deeper testing
Use this if core smoke/critical flows mostly passed.

Example:
Core auth and protected-route behavior are working. Continue to API-focused testing next, while logging and isolating the UI integration defects.

### Option B — pause deeper UI testing until critical bug is understood
Use this if task list or auth is badly broken.

Example:
Further browser UI testing should pause until the task list response mismatch is clarified or fixed, because several downstream UI behaviors depend on successful task rendering.

---

## Notes
Add anything useful from execution, such as:
- confusing behavior
- inconsistent messages
- browser console errors
- Swagger observations
- whether task data existed in the backend even when the UI looked empty