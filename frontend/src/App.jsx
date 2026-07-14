import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { computeStreak } from "./utils/computeStreak";
import HomePage from "./pages/HomePage";
import HabitDetailPage from "./pages/HabitDetailPage";
import Title from "./components/Title";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink Water",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-28", "2026-06-29"],
    },
    {
      id: 2,
      name: "Workout",
      frequency: "daily",
      completions: ["2026-06-27", "2026-06-29"],
    },
    {
      id: 3,
      name: "Read Book",
      frequency: "daily",
      completions: ["2026-06-23","2026-06-24","2026-06-25","2026-06-26","2026-06-27","2026-06-28","2026-06-29"],
    },
  ]);

  // 4. Compute streaks on app load
  useEffect(() => {
    setHabits((prev) =>
      prev.map((habit) => ({
        ...habit,
        streak: computeStreak(habit.completions),
      }))
    );
  }, []);

  // 2. Toggle today's completion
  const toggleToday = (id) => {
    const today = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completions.includes(today);
        const updatedCompletions = alreadyDone
          ? habit.completions.filter((d) => d !== today)
          : [...habit.completions, today];

        return {
          ...habit,
          completions: updatedCompletions,
          streak: computeStreak(updatedCompletions),
        };
      })
    );
  };

  // 5. Add habit
  const addHabit = (name, frequency) => {
    const newHabit = {
      id: Date.now(),
      name,
      frequency,
      completions: [],
      streak: 0,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // 5. Delete habit
  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const context = {
    habits,
    showForm,
    setShowForm,
    toggleToday,
    addHabit,
    deleteHabit,
  };

  return (
    <>
      <Title />

      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route element={<Outlet context={context} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/habit/:id" element={<HabitDetailPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
