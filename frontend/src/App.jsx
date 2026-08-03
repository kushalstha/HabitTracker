import { useState, useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { computeStreak } from "./utils/computeStreak";
import { toLocalDateString } from "./utils/date";
import HomePage from "./pages/HomePage";
import HabitDetailPage from "./pages/HabitDetailPage";
import AuthPage from "./pages/AuthPage";
import Title from "./components/Title";

import {
  getHabits,
  addHabit as addHabitAPI,
  updateHabit as updateHabitAPI,
  deleteHabit as deleteHabitAPI,
} from "./api/habitapi.js";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const navigate = useNavigate();

  const shouldBecomeWeekly = (completions = []) => {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return toLocalDateString(d);
    });

    return last7.every((date) => completions.includes(date));
  };

  // Load habits from MongoDB
  const loadHabits = async () => {
    if (!isAuthenticated) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await getHabits();

      const habitsWithStreak = response.data.map((habit) => ({
        ...habit,
        completions: habit.completions || [],
        streak: computeStreak(habit.completions || []),
      }));

      setHabits(habitsWithStreak);
    } catch (error) {
      console.error(error);
      setErrors([error.message]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, [isAuthenticated]);

  // Tick / Untick
  const toggleToday = async (id) => {
    const habit = habits.find((h) => h._id === id);

    if (!habit) return;

    const today = toLocalDateString(new Date());

    const currentCompletions = Array.isArray(habit.completions)
      ? habit.completions.filter(Boolean)
      : [];

    const updatedCompletions = currentCompletions.includes(today)
      ? currentCompletions.filter((date) => date !== today)
      : [...currentCompletions, today];

    let newFrequency = habit.frequency;
    let finalCompletions = updatedCompletions;

    if (habit.frequency === "daily" && shouldBecomeWeekly(updatedCompletions)) {
      newFrequency = "weekly";
      finalCompletions = [...new Set([today, ...updatedCompletions])];
    }

    try {
      await updateHabitAPI(id, {
        name: habit.name,
        frequency: newFrequency,
        completions: finalCompletions,
      });

      await loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  // Add Habit
  const handleAddHabit = async (name, frequency, selectedDays = []) => {
    try {
      const today = toLocalDateString(new Date());
      const completions = Array.isArray(selectedDays) ? selectedDays : [];
      const finalFrequency =
        frequency === "daily" && shouldBecomeWeekly(completions)
          ? "weekly"
          : frequency;

      const normalizedCompletions = Array.from(
        new Set(
          finalFrequency === "weekly"
            ? [...completions, today]
            : completions
        )
      );

      const payload = {
        name,
        frequency: finalFrequency,
        completions: normalizedCompletions,
      };

      await addHabitAPI(payload);

      setShowForm(false);

      await loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Habit
  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabitAPI(id);

      await loadHabits();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthSuccess = (name) => {
    setIsAuthenticated(true);
    setHabits([]);
    setErrors([]);
    if (name) setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserName("");
    setHabits([]);
    setErrors([]);
    navigate("/");
  };

  const context = {
    habits,
    showForm,
    setShowForm,
    toggleToday,
    addHabit: handleAddHabit,
    deleteHabit: handleDeleteHabit,
    loading,
    errors,
    isAuthenticated,
    logout,
    userName,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Title isAuthenticated={isAuthenticated} logout={logout} />

      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route element={<Outlet context={context} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/habit/:id" element={<HabitDetailPage />} />
            <Route
              path="/auth"
              element={<AuthPage onAuthSuccess={handleAuthSuccess} />}
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}