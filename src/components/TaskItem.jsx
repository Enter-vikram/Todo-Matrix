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
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl shadow-sm bg-white/80 dark:bg-[#0D0D0D] border border-[#D9C0BA] dark:border-[#444] transition-all ${
        animating ? "opacity-50 blur-sm" : ""
      }`}
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <h4
            className={`text-sm font-medium break-words ${
              task.done
                ? "line-through text-gray-400"
                : "text-[#0D0D0D] dark:text-white"
            }`}
          >
            {task.title}
          </h4>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => toggleComplete(task.id)}
              className="text-[#1DA1F2] hover:text-blue-500"
              title="Mark complete"
            >
              {task.done ? <CheckCircle size={18} /> : <Circle size={18} />}
            </button>
            <button
              onClick={() => togglePin(task.id)}
              className="text-[#F2EFC2] hover:text-[#F2EFC2]"
              title="Pin"
            >
              <Pin
                size={18}
                className={task.pin ? "rotate-45 fill-[#F2EFC2]" : ""}
              />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-[#F24E29] hover:text-red-600"
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
