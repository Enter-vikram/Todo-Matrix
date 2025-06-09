import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskMatrix from "./components/TaskMatrix";
import Analytics from "./components/Analytics";
import useLocalStorage from "./hooks/useLocalStorage";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useState({
    title: "",
    importance: true,
    urgency: true,
  });
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [animatingTaskId, setAnimatingTaskId] = useState(null);

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.reminder && !task.reminderShown) {
        const now = new Date();
        const reminderTime = new Date(task.reminder);
        if (reminderTime <= now) {
          alert(`Reminder: ${task.title}`);
          task.reminderShown = true;
          setTasks([...tasks]);
        }
      }
    });
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const quadrantCounts = {
    "Important & Urgent": tasks.filter((t) => t.quadrant === "q1").length,
    "Not Important but Urgent": tasks.filter((t) => t.quadrant === "q2").length,
    "Important but Not Urgent": tasks.filter((t) => t.quadrant === "q3").length,
    "Neither Important nor Urgent": tasks.filter((t) => t.quadrant === "q4")
      .length,
  };

  function getQuadrant(importance, urgency) {
    if (importance && urgency) return "q1";
    if (!importance && urgency) return "q2";
    if (importance && !urgency) return "q3";
    return "q4";
  }

  function addTask() {
    if (!newTask.title.trim()) return;
    const now = new Date();
    const task = {
      id: Date.now(),
      title: newTask.title,
      importance: newTask.importance,
      urgency: newTask.urgency,
      done: false,
      pin: false,
      createdAt: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quadrant: getQuadrant(newTask.importance, newTask.urgency),
      reminder: null,
      reminderShown: false,
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: "", importance: true, urgency: true });
  }

  function deleteTask(id) {
    setAnimatingTaskId(id);
    setTimeout(() => {
      setTasks(tasks.filter((t) => t.id !== id));
      setAnimatingTaskId(null);
    }, 300);
  }

  function toggleComplete(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function togglePin(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, pin: !t.pin } : t)));
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const activityLog = tasks.slice(0, 5).map((t) => ({
    type: t.done ? "Completed" : "Added",
    task: t.title,
    time: `${t.date} ${t.time}`,
  }));

  const quadrantLabels = {
    q1: "Important & Urgent",
    q2: "Not Important but Urgent",
    q3: "Important but Not Urgent",
    q4: "Neither Important nor Urgent",
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-[#F2EFC2] dark:bg-[#0D0D0D] text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  search={search}
                  setSearch={setSearch}
                />

                <main className="flex-1 flex flex-col px-4 max-w-3xl w-full mx-auto">
                  <TaskInput
                    newTask={newTask}
                    setNewTask={setNewTask}
                    addTask={addTask}
                  />

                  <TaskMatrix
                    tasks={filteredTasks}
                    toggleComplete={toggleComplete}
                    togglePin={togglePin}
                    deleteTask={deleteTask}
                    animatingTaskId={animatingTaskId}
                    quadrantLabels={quadrantLabels}
                  />

                  {/* Mobile View Analytics Button */}
                  <div className="md:hidden mt-4 mb-6">
                    <Link
                      to="/analytics"
                      className="block text-center w-full py-3 px-6 rounded-xl shadow-xl font-semibold transition hover:scale-[1.02] 
                        border-2 border-[#0D0D0D] dark:border-[#F24E29] 
                        text-[#0D0D0D] dark:text-[#F24E29] 
                        bg-[#F2EFC2] dark:bg-[#0D0D0D]"
                    >
                      📊 View Analytics
                    </Link>
                  </div>

                  {/* Desktop Analytics Section */}
                  <div className="hidden md:block mt-4 pb-32">
                    <Analytics
                      total={totalTasks}
                      completed={completedTasks}
                      quadrants={quadrantCounts}
                      tasks={tasks}
                      activityLog={activityLog}
                    />
                  </div>
                </main>
              </>
            }
          />

          <Route
            path="/analytics"
            element={
              <main className="px-4 max-w-3xl w-full mx-auto pt-4">
                <Analytics
                  total={totalTasks}
                  completed={completedTasks}
                  quadrants={quadrantCounts}
                  tasks={tasks}
                  activityLog={activityLog}
                />
                <div className="md:hidden mt-6">
                  <Link
                    to="/"
                    className="block w-full text-center py-3 px-6 rounded-xl shadow-xl font-semibold transition hover:scale-[1.02] 
                      border-2 border-[#0D0D0D] dark:border-[#F24E29] 
                      text-[#0D0D0D] dark:text-[#F24E29] 
                      bg-[#F2EFC2] dark:bg-[#0D0D0D]"
                  >
                    ← Back to Tasks
                  </Link>
                </div>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
