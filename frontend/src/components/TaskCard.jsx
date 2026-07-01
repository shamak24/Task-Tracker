import { toast } from "react-toastify";
import { FiCalendar, FiEdit3, FiTrash2 } from "react-icons/fi";
import API from "../services/api";

const TaskCard = ({ task, refreshTasks, onEdit }) => {
  const priorityClass = {
    High: "badge-danger",
    Medium: "badge-warning",
    Low: "badge-success",
  }[task.priority] || "badge-neutral";

  const statusClass = {
    Completed: "badge-success",
    "In Progress": "badge-info",
    Pending: "badge-neutral",
  }[task.status] || "badge-neutral";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${task._id}`);
      toast.success("Task deleted successfully.");
      refreshTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <article className="card task-card">
      <div className="task-card__header">
        <div>
          <h3>{task.title}</h3>
          <p className="task-description">
            {task.description || "No description provided."}
          </p>
        </div>
      </div>

      <div className="task-badges">
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
        <span className={`badge ${statusClass}`}>{task.status}</span>
      </div>

      <div className="task-meta">
        <span className="task-meta__item">
          <FiCalendar />
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "No due date"}
        </span>
      </div>

      <div className="task-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onEdit(task)}>
          <FiEdit3 /> Edit
        </button>

        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          <FiTrash2 /> Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;