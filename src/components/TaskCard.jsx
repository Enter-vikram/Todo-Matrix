import React from "react";
import { CheckCircle, Circle, X, Thumbtack, Clock } from "lucide-react";

const TaskCard = ({
  task,
  toggleComplete,
  togglePin,
  deleteTask,
  animating,
}) => {
  return (
    <div
      className={`flex justify-between items-start gap-3 p-4 rounded-xl bg-white/80 dark:bg-white/10 shadow-md backdrop-blur-md transition-all duration-300 ${
        animating ? "opacity-50 scale-95" : "opacity-100"
      }`}
    >
      {/* Left: Title + Date */}
      <div className="flex-1 overflow-hidden">
        <div className="text-base font-medium text-gray-900 dark:text-white break-words mb-1 pr-2">
          {task.title}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Clock className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {task.date} • {task.time}
          </span>
        </div>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-2 shrink-0 pt-1">
        <button
          onClick={() => toggleComplete(task.id)}
          className="text-green-500"
        >
          {task.done ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
        </button>
        <button onClick={() => togglePin(task.id)} className="text-blue-500">
          <Thumbtack className="w-4 h-4" />
        </button>
        <button onClick={() => deleteTask(task.id)} className="text-red-500">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
