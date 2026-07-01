import TaskCard from "./TaskCard";

const TaskList = ({ tasks, loading, refreshTasks, onEdit }) => {
  if (loading) {
    return (
      <div className="loading-state" aria-live="polite">
        <div className="loading-card skeleton" />
        <div className="loading-card skeleton" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Create your first task to build momentum for the day.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          refreshTasks={refreshTasks}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;