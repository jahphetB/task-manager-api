# Bug Report Template

## Purpose
This template is used to document defects found during manual testing, API testing, and automation. Each bug report should be clear enough that another tester or developer can reproduce the issue without extra explanation.

---

## Bug ID
BUG-XXX

## Title
Short, specific summary of the problem

### Good examples
- Task list does not render after successful task creation
- Duplicate username returns unclear UI message
- Unauthenticated `GET /api/tasks` returns wrong status code

---

## Summary
Brief description of the issue.

Example:
After logging in and creating a task, clicking `Refresh` does not display the created task in the browser UI even though the backend request succeeds.

---

## Environment
- Application: TaskManager
- Area: UI / API / Auth / Database / Integration
- Environment: Local development
- Browser: Chrome / Edge / Firefox
- Build/Version: current local build
- Date found: YYYY-MM-DD

---

## Preconditions
List any required setup before reproducing the issue.

Example:
- User is registered and logged in
- At least one task exists for the logged-in user

---

## Steps to Reproduce
1. Open the application
2. Log in with a valid user
3. Create a task
4. Click `Refresh`
5. Observe the task list area

---

## Expected Result
State what should happen.

Example:
The created task should appear in the task list with correct title, description, and status.

---

## Actual Result
State what actually happens.

Example:
The task list shows an empty-state message or does not display the created task even though task creation succeeded.

---

## Frequency
Choose one:
- Always
- Often
- Sometimes
- Rarely
- Unable to determine

---

## Severity
Choose one:
- Critical
- High
- Medium
- Low

### Severity guide
- Critical: blocks core use, security issue, or major failure
- High: core feature broken but workaround may exist
- Medium: important but not blocking
- Low: cosmetic or minor usability issue

---

## Priority
Choose one:
- Critical
- High
- Medium
- Low

### Priority guide
- Critical: must be fixed immediately
- High: should be fixed soon
- Medium: fix in normal cycle
- Low: can wait

---

## Impact
Describe who or what is affected.

Example:
A logged-in user cannot verify that their tasks exist in the browser UI, which makes core task management appear broken.

---

## Suspected Area
List the part of the system most likely related.

Example:
- `Controllers/TasksController.cs`
- `wwwroot/app.js`
- API/UI response contract for `GET /api/tasks`

---

## Evidence
Attach or reference supporting evidence:
- screenshot
- console error
- API response
- request/response payload
- video
- trace
- test case ID

Example:
- Related test case: `TC-006`
- Screenshot: `evidence/screenshots/bug-001-task-list-empty.png`

---

## Related Test Case
TC-XXX

---

## Status
Choose one:
- New
- Open
- In Progress
- Fixed
- Retest
- Closed
- Deferred

---

## Notes
Add any useful observations.

Example:
The frontend appears to expect `data.items`, but the backend response is a plain array. This may indicate a contract mismatch rather than a pure UI rendering problem.