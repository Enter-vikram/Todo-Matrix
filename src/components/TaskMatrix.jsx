// src/components/TaskMatrix.jsx
import React from "react";
import TaskItem from "./TaskItem";

const quadrantLabels = {
  q1: "Important & Urgent",
  q2: "Not Important but Urgent",
  q3: "Important but Not Urgent",
  q4: "Not Important & Not Urgent",
};

export default function TaskMatrix({
  tasks,
  toggleComplete,
  togglePin,
  deleteTask,
  animatingTaskId,
}) {
  const grouped = { q1: [], q2: [], q3: [], q4: [] };

  tasks?.forEach((task) => {
    const q = task.quadrant;
    if (!grouped[q]) grouped[q] = [];
    grouped[q].push(task);
  });

  const renderTasks = (quadrant) => {
    const sorted = [...(grouped[quadrant] || [])].sort((a, b) =>
      a.pin === b.pin ? 0 : a.pin ? -1 : 1
    );

    return sorted.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        toggleComplete={toggleComplete}
        togglePin={togglePin}
        deleteTask={deleteTask}
        animating={animatingTaskId === task.id}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {["q1", "q2", "q3", "q4"].map((q) => (
        <div
          key={q}
          className="bg-white/60 dark:bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            {quadrantLabels[q]}
          </h3>
          <div className="space-y-3">{renderTasks(q)}</div>
        </div>
      ))}
    </div>
  );
}
