// src/components/Analytics.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1DA1F2", "#F24E29", "#D9C0BA", "#0D0D0D"];

export default function Analytics({ total, completed, tasks, activityLog }) {
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Remaining", value: total - completed },
  ];

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-[#0D0D0D] dark:text-[#F2EFC2]">
        📊 Analytics Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0D0D0D] shadow-xl rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-sm text-[#1DA1F2] font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold text-[#0D0D0D] dark:text-[#F2EFC2]">
            {total}
          </p>
        </div>

        <div className="bg-white dark:bg-[#0D0D0D] shadow-xl rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-sm text-[#F24E29] font-semibold">Completed</h3>
          <p className="text-2xl font-bold text-[#0D0D0D] dark:text-[#F2EFC2]">
            {completed}
          </p>
        </div>

        <div className="bg-white dark:bg-[#0D0D0D] shadow-xl rounded-xl p-4 flex flex-col items-center">
          <h3 className="text-sm text-[#D9C0BA] font-semibold">
            Completion Rate
          </h3>
          <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full rounded-full"
              style={{
                width: `${completionRate}%`,
                backgroundColor: "#1DA1F2",
              }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500">{completionRate}%</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-[#0D0D0D] shadow-xl rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-[#1DA1F2]">
            Quadrant Distribution
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={60}
                fill="#8884d8"
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
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#0D0D0D] shadow-xl rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-[#F24E29]">
            Recent Activity
          </h4>
          <ul className="text-sm space-y-1">
            {activityLog.length === 0 ? (
              <li className="text-gray-400">No recent activity</li>
            ) : (
              activityLog.map((log, index) => (
                <li key={index} className="flex justify-between">
                  <span
                    className={`${
                      log.type === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {log.type}:
                  </span>
                  <span className="truncate">{log.task}</span>
                  <span className="text-gray-400 text-xs">{log.time}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
