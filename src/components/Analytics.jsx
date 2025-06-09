import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ActivityIcon, ListChecks } from "lucide-react";

const COLORS = ["#34D399", "#F87171"]; // Done, Pending

export default function Analytics({
  total = 0,
  completed = 0,
  quadrants = {},
  tasks = [],
  activityLog = [],
}) {
  const pinned = tasks.filter((t) => t.pin).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const quadrantLabels = {
    q1: "Urgent & Important",
    q2: "Not Important but Urgent",
    q3: "Important but Not Urgent",
    q4: "Not Important & Not Urgent",
  };

  const pieData = [
    { name: "Done", value: completed },
    { name: "Pending", value: total - completed },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 bg-white/60 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
        <ActivityIcon className="w-5 h-5 text-sky-500" /> Analytics Dashboard
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 text-sm text-center">
        <div className="bg-sky-100 dark:bg-sky-800 rounded-xl p-3">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            📋 Total Tasks
          </div>
          <div className="font-bold text-lg text-sky-700 dark:text-sky-200">
            {total}
          </div>
        </div>
        <div className="bg-emerald-100 dark:bg-emerald-800 rounded-xl p-3">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            ✅ Completed
          </div>
          <div className="font-bold text-lg text-emerald-700 dark:text-emerald-200">
            {completed}
          </div>
        </div>
        <div className="bg-rose-100 dark:bg-rose-800 rounded-xl p-3">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            📌 Pinned
          </div>
          <div className="font-bold text-lg text-rose-700 dark:text-rose-200">
            {pinned}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Progress
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm mt-1 text-gray-600 dark:text-gray-300">
          {progress}% Complete
        </div>
      </div>

      {/* Completion Pie Chart */}
      <div className="bg-white/50 dark:bg-gray-800 rounded-xl p-4">
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Completion Ratio
        </div>
        <div className="flex justify-center">
          <PieChart width={200} height={120}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={30}
              innerRadius={20}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="text-sm text-center text-gray-600 dark:text-gray-300">
          {progress}% done
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/50 dark:bg-gray-800 rounded-xl p-4">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
          🕒 Recent Activity
        </div>
        {activityLog?.length > 0 ? (
          <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
            {activityLog.slice(0, 5).map((log, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md"
              >
                <span>
                  {log.type}: <strong>{log.task}</strong>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(log.time).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-400">No recent activity</div>
        )}
      </div>

      {/* Task Table */}
      <div className="mt-6">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <ListChecks className="w-4 h-4 text-indigo-500" /> Task Table
        </div>
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Task</th>
                <th className="px-4 py-2 text-left">Quadrant</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-gray-200 dark:border-gray-600"
                  >
                    <td className="px-4 py-2">{t.title}</td>
                    <td className="px-4 py-2 font-medium">
                      {quadrantLabels[t.quadrant] || t.quadrant}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {t.date}, {t.time}
                    </td>
                    <td className="px-4 py-2">
                      {t.done ? (
                        <span className="text-green-500 font-medium">Done</span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No tasks yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
