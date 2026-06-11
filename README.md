<div align="center">

<!-- Banner Placeholder -->
<img src="https://placehold.co/1200x320/0f172a/e2e8f0?text=Task+Manager+%E2%80%94+Organize%2C+Prioritize%2C+Deliver" alt="Task Manager banner" width="100%" />

# Task Manager

**Efficiently organize, track, and complete your tasks with a clean, responsive, and productivity-focused interface.**

<p>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Tech-HTML%20%7C%20CSS%20%7C%20JavaScript-ff6b6b?style=for-the-badge" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Responsive-Yes-22c55e?style=for-the-badge" alt="Responsive" />
</p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Functionality Breakdown](#functionality-breakdown)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Author](#author)

---

## Overview

Task Manager is a modern task-tracking application designed to help users efficiently organize, prioritize, and manage everyday work in one place. It supports task creation, editing, deletion, completion tracking, subtasks, recurring tasks, and easy filtering so users can stay focused and productive.

The application is intentionally lightweight and runs entirely in the browser, making it fast to load, easy to use, and simple to deploy.

---

## Features

- Create, edit, and delete tasks
- Mark tasks as completed or undo completion
- Task categorization with priority levels
- Add and manage subtasks
- Recurring task support for daily and weekly repetition
- Search by keyword or category tag
- Filter by completion status and due date
- Sort tasks by due date, priority, or completion state
- Due-soon reminder highlighting
- Responsive interface for desktop and smaller screens
- Persistent storage with `localStorage`

---

## Functionality Breakdown

### Task Management

- Create tasks with title, description, due date, due time, priority, category, and recurrence.
- Edit existing tasks without losing the current task context.
- Delete tasks individually or clear the list when needed.

### Progress Tracking

- Mark tasks as completed or undo completion at any time.
- Track subtasks independently and automatically reflect overall completion when subtasks are finished.
- Highlight tasks that are approaching their due time.

### Productivity Controls

- Search tasks by title, description, category, or subtask content.
- Filter by completion state or due date.
- Sort by due date, priority, or completion status.

### Persistence

- Store task data in browser `localStorage`.
- Restore the current task list automatically after refresh.
- Support recurring tasks by creating the next occurrence when a task is completed.

---

## Architecture

Task Manager uses a simple client-side architecture optimized for clarity and maintainability.

| Layer | Responsibility |
| --- | --- |
| Presentation Layer | Renders the form, controls, task cards, badges, filters, and responsive layout. |
| State Layer | Keeps the in-memory task list, filter state, search keyword, and subtask drafts synchronized. |
| Interaction Layer | Handles create, edit, delete, complete, search, sort, and filter actions. |
| Persistence Layer | Saves and restores tasks from `localStorage`. |
| Derived View Layer | Builds filtered and sorted task views from the base task data before rendering. |

### Data Flow

1. User creates or updates a task through the form.
2. The script validates the input and updates the task array.
3. Task changes are saved to `localStorage`.
4. The list is re-rendered from the current state using the active filters and sort order.
5. The UI reflects the latest task status, subtasks, and reminders.

### Architectural Notes

- The app is framework-free and depends only on native browser APIs.
- Rendering is fully driven by JavaScript DOM updates.
- Business rules such as recurring task creation and due-soon detection are handled in the client logic.

## Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

### Backend

<p>
  <img src="https://img.shields.io/badge/Backend-None%20%28Frontend%20Only%29-6b7280?style=for-the-badge" alt="Backend none" />
</p>

### Database

<p>
  <img src="https://img.shields.io/badge/Storage-localStorage-0ea5e9?style=for-the-badge" alt="localStorage" />
</p>

### Tools

<p>
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</p>

---

## Project Structure

```bash
Task Manager/
├── index.html
├── scripts.js
├── style.css
└── Images/
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install dependencies

This project currently runs as a lightweight frontend application and does not require npm dependencies.

If you decide to add a local development server or backend later, install the relevant packages for that stack.

### 3. Configure environment variables

Environment variables are optional for the current frontend-only version.

If you later connect a backend API, create a `.env` file and add the required values using the example below.

### 4. Start the development server

You can open `index.html` directly in your browser or use a simple static server such as Live Server in VS Code.

```bash
npx serve .
```

---

## Usage

1. Open the application in your browser.
2. Fill out the task form with a title, description, due date, due time, priority, category, and optional recurrence.
3. Add subtasks if needed.
4. Click **Add Task** to save the task.
5. Use the filters, search bar, date picker, and sorting controls to organize your task list.
6. Mark tasks complete, edit them, or delete them as needed.
7. Completed tasks are stored in your browser using `localStorage`, so they remain available after refresh.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Krishna Pratik**
