# API Test Cases

## Purpose
This document contains the first API-focused test pack for the TaskManager application. The goal is to validate backend behavior independently from the browser UI.

## Why This Matters
These tests help determine whether failures are caused by:
- backend logic
- authentication/authorization rules
- request validation
- frontend/backend contract mismatch

## Scope
This API pack covers:
- registration
- login
- unauthorized access
- create task
- get task list
- get one task
- update task
- delete task
- per-user ownership
- response shape verification

## Tools
You can execute these with:
- Swagger UI
- Postman
- VS Code REST Client
- curl

## Environment
- Application: TaskManager API
- Base URL: `http://localhost:5166`
- Auth: JWT Bearer token
- Database: SQLite

## Test Data
- User A username: `qa_api_user_a_001`
- User A password: `Pass1234!`
- User B username: `qa_api_user_b_001`
- User B password: `Pass1234!`

---

# API-TC-001 — Register user with valid input

## Objective
Verify that a new user can register successfully.

## Method
POST

## Endpoint
`/api/auth/register`

## Request Body
```json
{
  "username": "qa_api_user_a_001",
  "password": "Pass1234!"
}