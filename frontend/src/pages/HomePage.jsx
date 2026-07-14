import { createPortal } from "react-dom";
import { useOutletContext } from "react-router-dom";
import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";

import Buttons from "../components/Buttons";


export default function HomePage() {
  const { habits, showForm, setShowForm, toggleToday, addHabit, deleteHabit } =
    useOutletContext();

  return (

    <>
      <div className="text-center py-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Build habits that stick.
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Track daily progress, keep your streaks alive, and turn small actions into lasting change.
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Habit
        </button>
      </div>



      <HabitList
        habits={habits}
        onToggle={toggleToday}
        onDelete={deleteHabit}
      />

      {showForm &&
        createPortal(
          <AddHabitForm
            onClose={() => setShowForm(false)}
            onAdd={addHabit}
          />,
          document.body
        )}
    </>
  );
}
