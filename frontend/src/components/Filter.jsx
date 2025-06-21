import React from "react";

const Filter = ({ onFilterChange, assigneeFilterValue }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Filter by assignee"
        value={assigneeFilterValue}
        onChange={(e) => onFilterChange("assignedTo", e.target.value)}
      />
      <select onChange={(e) => onFilterChange("status", e.target.value)}>
        <option value="">All Statuses</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default Filter;
