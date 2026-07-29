import { Link } from "react-router-dom";
import { useState } from "react";
import Buttons from "./Buttons";
import { toLocalDateString, parseLocalDateString } from "../utils/date";
export default function HabitCard({ habit, onToggle, onDelete, isAuthenticated }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const today = toLocalDateString(new Date());
  const isCompleted = habit.completions.includes(today);

  // Last 7 days from Sunday to Saturday
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return toLocalDateString(d);
  });

  return (
    <div className="bg-white border border-black/10 p-4 rounded-3xl shadow-sm">

      {/* TOP ROW */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="font-semibold text-lg">
            <Link to={`/habit/${habit._id}`} className="hover:underline">              {habit.name}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">
            🔥 Streak: {habit.streak ?? 0} | {habit.frequency}
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex gap-2 items-center">
            <Buttons
              onClick={() => onToggle(habit._id)}
              variant="success"
              className="w-12 h-12 flex items-center justify-center p-0"
            >
              {isCompleted ? "✓" : ""}
            </Buttons>

            {!confirmingDelete ? (
              <Buttons onClick={() => setConfirmingDelete(true)} variant="danger">
                Delete
              </Buttons>
            ) : (
              <div className="flex items-center gap-2">
                <Buttons
                  onClick={() => {
                    onDelete(habit._id);
                    setConfirmingDelete(false);
                  }}
                  variant="danger"
                  className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                >
                  Confirm
                </Buttons>

                <Buttons
                  onClick={() => setConfirmingDelete(false)}
                  variant="neutral"
                >
                  Cancel
                </Buttons>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CALENDAR STRIP — Sunday to Saturday */}
      <div className="flex gap-2">
        {last7.map((date, index) => {
          const ticked = habit.completions.includes(date);
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">
                {days[parseLocalDateString(date).getDay()]}
              </span>
              <input
                type="checkbox"
                checked={ticked}
                readOnly
                className="w-5 h-5 accent-green-500"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}