import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <main className="dashboard">

        <section className="left-panel">
          <TaskForm refreshTasks={fetchTasks} />
        </section>

        <section className="right-panel">
          <h2>Your Tasks</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <TaskList
              tasks={tasks}
              refreshTasks={fetchTasks}
              onEdit={(task) => console.log(task)}
            />
          )}
        </section>

      </main>
    </>
  );
};

export default Home;
