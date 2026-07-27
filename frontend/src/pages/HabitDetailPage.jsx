import { useParams, useNavigate, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Buttons from "../components/Buttons";

export default function HabitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { habits, toggleToday, deleteHabit } = useOutletContext();

  // Find habit using MongoDB _id
  const habit = habits.find((h) => h._id === id);

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
  const isCompleted = (habit.completions || []).includes(today);

  const sortedCompletions = [...(habit.completions || [])]
    .sort()
    .reverse();

  return (
    <div className="max-w-md mx-auto">
      <Link to="/" className="text-green-600 underline">
        &larr; Back to habits
      </Link>

      <div className="bg-white p-5 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-2">{habit.name}</h1>

        <p className="text-gray-500 mb-2">
          Frequency: {habit.frequency}
        </p>

        <p className="mb-4">
          🔥 Streak: {habit.streak ?? 0}
        </p>

        {isAuthenticated && (
          <Buttons
            onClick={() => toggleToday(habit._id)}
            variant={isCompleted ? "primary" : "neutral"}
          >
            {isCompleted ? "✓ Done Today" : "Mark Today Done"}
          </Buttons>
        )}

        <h2 className="font-semibold mt-6 mb-2">
          Completion History
        </h2>

        {sortedCompletions.length === 0 ? (
          <p>No completions yet.</p>
        ) : (
          <ul className="space-y-1">
            {sortedCompletions.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        )}

        {isAuthenticated && (
          <div className="mt-6">
            <Buttons
              variant="danger"
              onClick={() => {
                deleteHabit(habit._id);
                navigate("/");
              }}
            >
              Delete Habit
            </Buttons>
          </div>
        )}
      </div>
    </div>
  );
}