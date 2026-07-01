import API from "../services/api";

const TaskCard = ({ task, refreshTasks, onEdit }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${task._id}`);
      refreshTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="card task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <div className="task-info">
      <span>{task.priority}</span>
      <span>{task.status}</span>
    </div>

      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;