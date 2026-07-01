import { useState } from "react";
import API from "../services/api";

const TaskForm = ({ refreshTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!formData.dueDate) {
      alert("Due date is required");
      return;
    }

    try {
      await API.post("/tasks", formData);

      // Clear form
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });

      // Refresh task list
      refreshTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="card">
      <h2>Add New Task</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>
    </form>
    </div>
  );
};

export default TaskForm;