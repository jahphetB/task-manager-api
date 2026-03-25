# BUG-002 — Toggle task completion fails because UI cannot locate task from returned list data

## Bug ID
BUG-002

## Title
Toggle task completion fails because UI cannot locate task from returned list data

## Summary
When a user attempts to toggle task completion from the browser UI, the operation fails because the frontend cannot find the selected task in the fetched task list data.

## Environment
- Application: TaskManager
- Area: UI / API Integration
- Environment: Local development
- Browser: _fill in_
- Build/Version: current local build
- Date found: _fill in_

## Preconditions
- User is logged in
- At least one task exists
- Task is expected to be visible in the UI flow

## Steps to Reproduce
1. Open the TaskManager browser UI
2. Log in with a valid user
3. Create at least one task if needed
4. Attempt to toggle a task from pending to completed, or completed to pending
5. Observe the result

## Expected Result
The selected task’s completion status should update successfully, and the new state should appear after refresh.

## Actual Result
The UI cannot complete the toggle action successfully. It may show a warning such as `Task not found on this page. Try Refresh.` or fail to update the task state.

## Frequency
Always / _fill in based on execution_

## Severity
High

## Priority
High

## Impact
A core task-management action is broken from the browser UI, reducing confidence in task editing behavior.

## Suspected Area
- `TaskManager.Api/wwwroot/app.js`
- Task list response handling
- Toggle flow in `toggleTask(taskId)`

## Root Cause Hypothesis
The toggle flow fetches the current task list and then tries to locate the selected task using:

`(data.items ?? []).find(...)`

If the backend returns a plain array instead of an object with an `items` property, the task is never found and the toggle operation cannot proceed.

## Evidence
- Related test case: `TC-007`
- Related scenario: `UI-009`, `INT-003`
- Screenshot: _add if available_
- Console/API output: _add if available_

## Related Test Case
TC-007

## Status
New

## Notes
This issue is likely related to the same API/UI response mismatch affecting task rendering.