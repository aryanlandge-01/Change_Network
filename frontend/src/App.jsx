import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import * as api from "./api/tasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [assigneeSearch, setAssigneeSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, assignedTo: assigneeSearch }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [assigneeSearch]);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      const { data } = await api.fetchTasks(filters);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleSave = async (taskData) => {
    try {
      await api.createTask(taskData);
      loadTasks();
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.updateTaskStatus(id, status);
      loadTasks();
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === "assignedTo") {
      setAssigneeSearch(value);
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onSave={handleSave} />
      <Filter
        onFilterChange={handleFilterChange}
        assigneeFilterValue={assigneeSearch}
      />
      <TaskList
        tasks={tasks}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
