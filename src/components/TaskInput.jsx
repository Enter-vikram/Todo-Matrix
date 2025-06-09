// src/components/TaskInput.jsx
import React from "react";
import { PlusCircle } from "lucide-react";

export default function TaskInput({ newTask, setNewTask, addTask }) {
  const handleChange = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="mb-6 bg-white/70 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Add New Task
      </h3>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          type="text"
          value={newTask.title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter task title..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600"
        />
        <div className="flex gap-2 items-center justify-between sm:justify-start">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={newTask.importance}
              onChange={() =>
                setNewTask({ ...newTask, importance: !newTask.importance })
              }
            />
            Important
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={newTask.urgency}
              onChange={() =>
                setNewTask({ ...newTask, urgency: !newTask.urgency })
              }
            />
            Urgent
          </label>
        </div>
        <button
          onClick={addTask}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition"
        >
          <PlusCircle size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
