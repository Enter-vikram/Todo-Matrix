// src/components/TaskMatrix.jsx
import React from "react";
import TaskItem from "./TaskItem";

const quadrantTitles = {
  q1: "Urgent & Important",
  q2: "Urgent & Not Important",
  q3: "Not Urgent & Important",
  q4: "Not Urgent & Not Important",
};

export default function TaskMatrix({
  tasks,
  toggleComplete,
  togglePin,
  deleteTask,
  animatingTaskId,
  search,
}) {
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const quadrantTasks = {
    q1: [],
    q2: [],
    q3: [],
    q4: [],
  };

  filteredTasks.forEach((task) => {
    quadrantTasks[task.quadrant].push(task);
  });

  const sortedTasks = (tasks) =>
    [...tasks].sort((a, b) => {
      if (a.pin === b.pin) return a.id < b.id ? 1 : -1;
      return b.pin - a.pin;
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {Object.entries(quadrantTitles).map(([key, title]) => (
        <div
          key={key}
          className="bg-white/70 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-md"
        >
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-100">
            {title}
          </h3>
          <div className="flex flex-col gap-3">
            {sortedTasks(quadrantTasks[key]).map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                togglePin={togglePin}
                deleteTask={deleteTask}
                animating={animatingTaskId === task.id}
              />
            ))}
            {sortedTasks(quadrantTasks[key]).length === 0 && (
              <p className="text-sm text-gray-400">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
