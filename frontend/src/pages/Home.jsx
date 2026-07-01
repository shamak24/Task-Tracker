import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const Home = ({ theme, toggleTheme }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Unable to load tasks right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!isMobileFormOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileFormOpen(false);
        setEditingTask(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileFormOpen]);

  const openTaskForm = (task = null) => {
    setEditingTask(task);
    setIsMobileFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsMobileFormOpen(false);
    setEditingTask(null);
  };

  const refreshAndClose = async () => {
    await fetchTasks();
    if (window.innerWidth < 768) {
      setIsMobileFormOpen(false);
    }
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="dashboard">
        <section className="left-panel">
          <TaskForm
            refreshTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        </section>

        <section className="right-panel">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">Productivity board</p>
              <h2>Your Tasks</h2>
            </div>
            <span className="task-count">{tasks.length} total</span>
          </div>

          <TaskList
            tasks={tasks}
            loading={loading}
            refreshTasks={fetchTasks}
            onEdit={(task) => openTaskForm(task)}
          />
        </section>

        {isMobileFormOpen && (
          <div className="mobile-form-overlay" onClick={closeTaskForm}>
            <div className="mobile-form-panel" onClick={(event) => event.stopPropagation()}>
              <TaskForm
                refreshTasks={refreshAndClose}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                onClose={closeTaskForm}
                isModal
              />
            </div>
          </div>
        )}

        <button type="button" className="mobile-fab" onClick={() => openTaskForm(null)}>
          <FiPlus /> <span>Add Task</span>
        </button>
      </main>
    </>
  );
};

export default Home;
