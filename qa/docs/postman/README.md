# Postman Pack

## Purpose
This folder documents the Postman setup used to test the TaskManager API.

The goals are:
- run API tests independently from the browser UI
- reuse auth tokens and IDs across requests
- make API execution repeatable
- prepare the project for later CLI/CI execution

---

## Collection Name
`TaskManager API Tests`

## Environment Name
`TaskManager Local`

---

## Environment Variables

Create these variables in Postman:

| Variable | Initial Value | Purpose |
|---|---|---|
| `baseUrl` | `http://localhost:5166` | Base URL for local API |
| `token` | *(blank)* | JWT token for the current logged-in user |
| `userAUsername` | `qa_api_user_a_001` | User A username |
| `userAPassword` | `Pass1234!` | User A password |
| `userBUsername` | `qa_api_user_b_001` | User B username |
| `userBPassword` | `Pass1234!` | User B password |
| `userATaskId` | *(blank)* | Stores a task ID created by User A |
| `userBTaskId` | *(blank)* | Stores a task ID created by User B |

---

## Recommended Collection Structure

### Auth
- Register User A
- Register User B
- Login User A
- Login User B

### Tasks
- Get Tasks (Unauthorized)
- Create Task
- Get My Tasks
- Get One Task
- Update Task
- Delete Task
- Get Tasks (Completed Only)
- Get Tasks (Incomplete Only)

### Ownership / Security
- User B Get User A Task
- User B Update User A Task
- User B Delete User A Task

### Contract Check
- Verify Task List Response Shape

---

## Request URL Pattern
Use:
`{{baseUrl}}/api/...`

Example:
`{{baseUrl}}/api/auth/login`

---

## Auth Header Pattern
For protected requests, use:

`Authorization: Bearer {{token}}`

---

## Execution Order for First Run
1. Register User A
2. Register User B
3. Login User A
4. Create Task
5. Get My Tasks
6. Get One Task
7. Update Task
8. Get Tasks (Completed Only)
9. Get Tasks (Incomplete Only)
10. Login User B
11. User B Get User A Task
12. User B Update User A Task
13. User B Delete User A Task
14. Get Tasks (Unauthorized)
15. Verify Task List Response Shape

---

## Expected High-Value Finding
The backend task list currently returns a plain JSON array, while the browser UI expects an object with an `items` field. The Postman contract-check request should help confirm that mismatch clearly.

---

## What to Export Later
After building the collection, export:
- the collection JSON
- the environment JSON

Save them in this folder later so the repo contains runnable API test artifacts.