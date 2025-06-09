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
    <div className="mb-6 bg-[#F2EFC2]/70 dark:bg-[#1a1a1a] backdrop-blur-md border border-[#D9C0BA] dark:border-[#333] rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-[#0D0D0D] dark:text-[#F2EFC2]">
        Add New Task
      </h3>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          type="text"
          value={newTask.title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter task title..."
          className="flex-1 px-4 py-2 rounded-lg border border-[#D9C0BA] dark:border-[#555] bg-white dark:bg-[#0D0D0D] text-sm focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
        />
        <div className="flex gap-2 items-center justify-between sm:justify-start">
          <label className="flex items-center gap-1 text-sm text-[#0D0D0D] dark:text-[#F2EFC2]">
            <input
              type="checkbox"
              checked={newTask.importance}
              onChange={() =>
                setNewTask({ ...newTask, importance: !newTask.importance })
              }
            />
            Important
          </label>
          <label className="flex items-center gap-1 text-sm text-[#0D0D0D] dark:text-[#F2EFC2]">
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
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#F24E29] hover:bg-[#e44321] text-white text-sm font-medium transition"
        >
          <PlusCircle size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
