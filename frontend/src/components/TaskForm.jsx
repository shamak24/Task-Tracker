import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiCheckCircle, FiPlusCircle, FiXCircle } from "react-icons/fi";
import API from "../services/api";

const initialFormData = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

const TaskForm = ({ refreshTasks, editingTask, setEditingTask, onClose, isModal = false }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
      });
      setErrors({});
    } else {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setEditingTask(null);
    if (onClose) {
      onClose();
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Please enter a task title.";
    }

    if (!formData.dueDate) {
      nextErrors.dueDate = "Please select a due date.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
        toast.success("Task updated successfully.");
      } else {
        await API.post("/tasks", formData);
        toast.success("Task created successfully.");
      }

      resetForm();
      await refreshTasks();
      setEditingTask(null);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`card form-card ${isModal ? "form-card--modal" : ""}`}>
      <div className="form-card__header">
        <div>
          <p className="section-eyebrow">Task planner</p>
          <h2>{editingTask ? "Edit Task" : "Create a task"}</h2>
        </div>
      </div>

      <p className="form-subtitle">
        {editingTask
          ? "Update the details for this task."
          : "Capture what needs your attention next."}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g. Prepare internship presentation"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "input-error" : ""}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <span id="title-error" className="field-error">
              {errors.title}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="Add a few helpful details..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="field-row">
          <div className="field-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={errors.dueDate ? "input-error" : ""}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
          />
          {errors.dueDate && (
            <span id="dueDate-error" className="field-error">
              {errors.dueDate}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {editingTask ? (
              <>
                <FiCheckCircle /> Update Task
              </>
            ) : (
              <>
                <FiPlusCircle /> Add Task
              </>
            )}
          </button>

          {(editingTask || onClose) && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              <FiXCircle /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;