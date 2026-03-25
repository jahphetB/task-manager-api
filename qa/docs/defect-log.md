# Defect Log

## Purpose
This document tracks defects found during testing of the TaskManager application. It provides a quick summary of bug status, severity, and related test coverage.

| Bug ID | Title | Area | Severity | Priority | Status | Related Test Case | Notes |
|---|---|---|---|---|---|---|---|
| BUG-001 | Task list does not render correctly after successful task creation | UI / API Integration | High | High | New | TC-006 | Frontend expects `items`, backend returns plain array |
| BUG-002 | Toggle task completion fails because UI cannot locate task from returned list data | UI / API Integration | High | High | New | TC-007 | Toggle flow also depends on `data.items` |