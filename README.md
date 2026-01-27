# Task Manager App

A web-based task management application inspired by Kanban boards. Users can create boards, add tasks to different columns (Todo, In Progress, Done), edit and delete tasks, and drag-and-drop tasks between columns. Built with **React**, **Redux Toolkit**, **TypeScript**, and **Node.js/Express**, with **MongoDB** as the database.

---

## Features

- **Boards Management**
  - Create, update, and delete boards
  - View all boards in a modal
  - Copy board ID to quickly share or load a board

- **Tasks Management**
  - Add, edit, and delete tasks
  - Tasks organized into columns: Todo, In Progress, Done
  - Drag-and-drop tasks between columns

- **Responsive UI**
  - Fully responsive layout for desktop and mobile
  - Modal dialogs for creating/editing boards and tasks

- **Notifications**
  - Error notifications for invalid board IDs or duplicate tasks
  - Confirmation prompts for deletions

---

## Tech Stack

- **Frontend:** React, Redux Toolkit, TypeScript, Tailwind CSS, react-icons, @hello-pangea/dnd
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Other Tools:** react-loader-spinner, react-hot-toast, Nodemon

---

# Installation

### Backend

1. Clone the repository:

git clone <repository-url>

2. Install dependencies:

npm install

3. Create a .env file:

PORT=3000
MONGO_URI=mongodb+srv://natasha:212121@kamban.sizy77v.mongodb.net/my_boards?appName=kamban

4. Run in development mode:

npm run dev

5. Build and run production:

npm run build
npm start

---

### Frontend

1. Create a .env file:

VITE_API_URL=https://task-manager-backend-a7if.onrender.com

2. Install dependencies:

npm install

3. Run development server:

npm run dev

4. Open http://localhost:5173 in your browser.

# API Endpoints

## Boards

- - GET /boards – List all boards

- - POST /boards – Create a new board

- - PUT /boards/:boardId – Update board name

- - GET /boards/:boardId – Get single board

- - DELETE /boards/:boardId – Delete a board

## Tasks

- - POST /boards/:boardId/:column – Create a new task

- - PUT /boards/:boardId/:column/:taskId – Update a task

- - PATCH /boards/:boardId/tasks/:taskId/column – Move task between columns

- - DELETE /boards/:boardId/:column/:taskId – Delete a task
