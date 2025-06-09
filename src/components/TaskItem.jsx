// src/components/TaskItem.jsx
import React from "react";
import { CheckCircle, Circle, Pin, Trash2 } from "lucide-react";

export default function TaskItem({
  task,
  toggleComplete,
  togglePin,
  deleteTask,
  animating,
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl shadow-sm bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all ${
        animating ? "opacity-50 blur-sm" : ""
      }`}
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <h4
            className={`text-sm font-medium break-words ${
              task.done ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h4>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => toggleComplete(task.id)}
              className="text-green-500 hover:text-green-600"
              title="Mark complete"
            >
              {task.done ? <CheckCircle size={18} /> : <Circle size={18} />}
            </button>
            <button
              onClick={() => togglePin(task.id)}
              className="text-yellow-500 hover:text-yellow-600"
              title="Pin"
            >
              <Pin
                size={18}
                className={task.pin ? "rotate-45 fill-yellow-400" : ""}
              />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-600"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {task.date} at {task.time}
        </div>
      </div>
    </div>
  );
}
