import React from "react";

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Assigned to: {task.assignedTo}</p>
          <p>Status: {task.status}</p>
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(task._id, e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
