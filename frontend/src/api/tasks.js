import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

export const fetchTasks = (filters) => API.get("/tasks", { params: filters });
export const createTask = (newTask) => API.post("/tasks", newTask);
export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
