import React, { useState } from "react";

const TaskForm = ({ onSave, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [assignedTo, setAssignedTo] = useState(
    taskToEdit ? taskToEdit.assignedTo : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, assignedTo });
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Assign To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      />
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
