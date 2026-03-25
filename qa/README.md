# QA Portfolio Work — TaskManager

## Purpose
This folder contains the manual and automation testing work for the TaskManager project.

## What is included
- manual test planning documents
- smoke checklist
- risk map
- test scenarios
- test cases
- defect tracking documents
- API testing plan
- Postman setup notes
- Playwright UI automation tests

## Current automation coverage
The Playwright suite currently covers:
1. UI loads successfully
2. Logged-out users cannot use protected task actions
3. User can register and log in
4. Logged-in user can create a task
5. Logout clears session and disables protected controls
6. Created task appears in the task list after refresh

## Folder structure
- `docs/` → manual testing documents, execution reports, and bug tracking
- `postman/` → Postman setup notes and API testing artifacts
- `playwright/` → Playwright configuration and UI automation tests

## How to run Playwright tests
From `qa/playwright`:

```powershell
npm test