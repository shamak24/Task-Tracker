import TaskCard from "./TaskCard";

const TaskList = ({ tasks, refreshTasks, onEdit }) => {

  if (tasks.length === 0) {
    return (
      <div className="card">
        <h3>No Tasks Yet</h3>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          refreshTasks={refreshTasks}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TaskList;