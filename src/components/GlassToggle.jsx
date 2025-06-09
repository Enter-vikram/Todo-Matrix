import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "../context/ThemeContext";

export default function Analytics({ tasks }) {
  const { isDarkMode } = useTheme();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pinnedTasks = tasks.filter((t) => t.pinned).length;
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const quadrantCounts = {
    q1: tasks.filter((t) => t.important && t.urgent).length,
    q2: tasks.filter((t) => t.important && !t.urgent).length,
    q3: tasks.filter((t) => !t.important && t.urgent).length,
    q4: tasks.filter((t) => !t.important && !t.urgent).length,
  };

  const pieData = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: totalTasks - completedTasks },
  ];

  const COLORS = ["#1DA1F2", "#F24E29"];

  const recentActivity = tasks
    .flatMap((task) => {
      const activity = [];
      if (task.createdAt)
        activity.push({
          type: "Added",
          title: task.title,
          time: task.createdAt,
        });
      if (task.completed && task.completedAt)
        activity.push({
          type: "Completed",
          title: task.title,
          time: task.completedAt,
        });
      return activity;
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5);

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-lg font-semibold text-sky-500 dark:text-sky-400">
        📊 Analytics Dashboard
      </h2>

      {/* KPI Section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
          <p className="text-muted-foreground text-sm mb-1">Total Tasks</p>
          <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
            {totalTasks}
          </p>
        </div>
        <div className="flex-1 p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
          <p className="text-muted-foreground text-sm mb-1">Completed</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {completedTasks}
          </p>
        </div>
        <div className="flex-1 p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
          <p className="text-muted-foreground text-sm mb-1">Pinned</p>
          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {pinnedTasks}
          </p>
        </div>
        <div className="flex-1 p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
          <p className="text-muted-foreground text-sm mb-1">Completion Rate</p>
          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
            {completionRate}%
          </p>
        </div>
      </div>

      {/* Ratio Pie Chart */}
      <div className="p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
        <p className="text-muted-foreground text-sm mb-2 font-medium">
          Completion Ratio
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
          {completionRate}% done
        </p>
      </div>

      {/* Recent Activity */}
      <div className="p-4 rounded-xl shadow bg-white dark:bg-zinc-900">
        <p className="text-muted-foreground text-sm font-medium mb-2">
          🕓 Recent Activity
        </p>
        <ul className="space-y-1 text-sm">
          {recentActivity.length ? (
            recentActivity.map((act, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">{act.type}:</span> {act.title}{" "}
                <span className="text-xs text-gray-400">
                  ({new Date(act.time).toLocaleString()})
                </span>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No recent activity</li>
          )}
        </ul>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-zinc-900">
        <table className="min-w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-zinc-800 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-4 py-2">
                Task
              </th>
              <th scope="col" className="px-4 py-2">
                Quadrant
              </th>
              <th scope="col" className="px-4 py-2">
                Created At
              </th>
              <th scope="col" className="px-4 py-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length ? (
              tasks.map((task, i) => (
                <tr key={i} className="border-b dark:border-zinc-800">
                  <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-100">
                    {task.title}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                    {task.important && task.urgent
                      ? "Urgent & Important"
                      : task.important && !task.urgent
                      ? "Important but Not Urgent"
                      : !task.important && task.urgent
                      ? "Not Important but Urgent"
                      : "Not Important & Not Urgent"}
                  </td>
                  <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    {task.createdAt}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.completed
                          ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                          : "bg-rose-200 text-rose-800 dark:bg-rose-700 dark:text-rose-200"
                      }`}
                    >
                      {task.completed ? "Done" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-4 text-center text-gray-400 dark:text-gray-500"
                >
                  No tasks yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
