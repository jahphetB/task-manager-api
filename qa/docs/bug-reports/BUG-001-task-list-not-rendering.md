# BUG-001 — Task list does not render correctly after successful task creation

## Bug ID
BUG-001

## Title
Task list does not render correctly after successful task creation

## Summary
After a user logs in and creates a task successfully, the browser UI does not display the created task correctly when the task list is loaded or refreshed.

## Environment
- Application: TaskManager
- Area: UI / API Integration
- Environment: Local development
- Browser: _fill in_
- Build/Version: current local build
- Date found: _fill in_

## Preconditions
- User is registered
- User is logged in
- At least one task has been created successfully

## Steps to Reproduce
1. Open the TaskManager browser UI
2. Log in with a valid user
3. Create a task with a valid title
4. Click `Refresh` or allow the app to reload tasks automatically
5. Observe the task list area

## Expected Result
The created task should appear in the task list with correct title, description, and status.

## Actual Result
The task list does not render the returned task correctly. The UI may show an empty state such as `No tasks found.` or fail to show task data even though task creation succeeded.

## Frequency
Always

## Severity
High

## Priority
High

## Impact
This makes the core task-management flow appear broken from the browser UI, even if the backend successfully stores tasks.

## Suspected Area
- `TaskManager.Api/Controllers/TasksController.cs`
- `TaskManager.Api/wwwroot/app.js`
- Response contract for `GET /api/tasks`

## Root Cause Hypothesis
The frontend expects a paged response object with fields like:
- `items`
- `page`
- `pageSize`
- `totalItems`
- `totalPages`

However, the backend `GET /api/tasks` currently returns a plain array of tasks.  
Because `renderTasks()` uses `paged.items ?? []`, the UI treats the response as if it contains no tasks.

## Evidence
- Related test case: `TC-006`
- Related scenario: `UI-007`, `UI-008`, `API-008`, `INT-002`
- Screenshot: _add if available_
- API response sample: _add if available_

## Related Test Case
TC-006

## Status
New

## Notes
This appears to be an API/UI contract mismatch rather than a pure rendering-only issue.