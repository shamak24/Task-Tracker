# Task Tracker

A modern, responsive Task Tracker web application built using the MERN stack. The application allows users to efficiently manage their daily tasks with complete CRUD functionality, a clean user interface, responsive design, and support for both light and dark themes.

## Live Demo

**Frontend:** https://your-frontend-url.vercel.app

**Backend API:** https://your-backend-url.onrender.com

---

## Features

### Task Management

- Create new tasks
- View all tasks
- Update existing tasks
- Delete tasks
- Real-time UI updates without page refresh

### Task Details

- Title
- Description
- Priority (Low, Medium, High)
- Status (Pending, In Progress, Completed)
- Due Date

### User Experience

- Responsive design for desktop, tablet, and mobile devices
- Light and Dark mode
- Mobile-friendly dashboard
- Floating Add Task button on mobile devices
- Responsive task cards
- Modern dashboard layout
- Form validation
- Confirmation before deleting tasks
- Toast notifications
- Loading states
- Empty state for new users

---

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Icons
- React Toastify
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Database

- MongoDB Atlas

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

```
task-tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|----------|-----------------|--------------------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Database Schema

```javascript
{
  title: String,
  description: String,
  priority: "Low" | "Medium" | "High",
  status: "Pending" | "In Progress" | "Completed",
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/shamak24/Task-Tracker.git
```

Navigate to the project.

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
bun install
```

Create a `.env` file.

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend server.

```bash
bun run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
bun install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend.

```bash
bun run dev
```

---

## Application Workflow

1. User creates a new task.
2. The frontend sends a POST request to the backend.
3. The backend validates and stores the task in MongoDB.
4. Updated data is returned to the frontend.
5. The task list refreshes automatically without reloading the page.
6. Users can edit or delete existing tasks.
7. Changes are immediately reflected in the UI.

---

## Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile devices

Desktop users get a two-column dashboard, while mobile users interact with an optimized layout with a dedicated Add Task interface.

---

## Form Validation

The application validates:

- Required title
- Required due date
- Valid priority selection
- Valid status selection

Invalid submissions are prevented before reaching the backend.

---

## Environment Variables

### Backend

```env
MONGO_URI=your_mongodb_connection_string
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Future Improvements

- User authentication
- Task categories
- Search functionality
- Filter and sorting options
- Drag-and-drop task organization
- Due date reminders
- Calendar integration
- Pagination
- Task labels
- File attachments
- Team collaboration

---

## Learning Outcomes

This project demonstrates understanding of:

- React fundamentals
- Component-based architecture
- React Hooks
- RESTful API development
- Express.js
- MongoDB integration
- Mongoose models
- CRUD operations
- Axios for API communication
- Form validation
- State management
- Responsive web design
- Environment variable management
- Full-stack application deployment

---

This project is developed for educational purposes as part of an internship selection assignment.
