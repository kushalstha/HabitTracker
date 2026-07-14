import { useParams, useNavigate, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import Buttons from "../components/Buttons";

export default function HabitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, toggleToday, deleteHabit } = useOutletContext();

  const habit = habits.find((h) => String(h.id) === id);

  if (!habit) {
    return (
      <div className="max-w-md mx-auto">
        <p className="mb-4">Habit not found.</p>
        <Link to="/" className="text-green-600 underline">
          &larr; Back to habits
        </Link>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const isCompleted = habit.completions.includes(today);
  const sortedCompletions = [...habit.completions].sort().reverse();

  return (
    <div className="max-w-md mx-auto">
      <Link to="/" className="text-green-600 underline">
        &larr; Back to habits
      </Link>

      <div className="bg-white p-5 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-1">{habit.name}</h1>
        <p className="text-gray-500 mb-4">{habit.frequency}</p>

        <p className="mb-4">🔥 Streak: {habit.streak ?? 0} days</p>


        <Buttons
          onClick={() => toggleToday(habit.id)}
          variant={isCompleted ? "primary" : "neutral"}
          className="px-4 py-2 mb-5"
        >
          {isCompleted ? "✓ Done today" : "Mark today done"}
        </Buttons>

        <h2 className="font-semibold mb-2">Completion history</h2>
        {sortedCompletions.length === 0 ? (
          <p className="text-sm text-gray-500">No completions yet.</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1 max-h-48 overflow-y-auto">
            {sortedCompletions.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        )}

        <Buttons
          onClick={() => {
            deleteHabit(habit.id);
            navigate("/");
          }}
          variant="danger"
          className="mt-5"
        >
          Delete habit
        </Buttons>
      </div>
    </div>
  );
}
