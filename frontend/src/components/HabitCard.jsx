import { useState } from "react";
import Buttons from "./Buttons";
import { toLocalDateString, parseLocalDateString } from "../utils/date";
export default function HabitCard({ habit, onToggle, onDelete, isAuthenticated }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const today = toLocalDateString(new Date());
  const isCompleted = habit.completions.includes(today);

  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
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
          <h2 className="font-semibold text-lg">{habit.name}</h2>
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

      <div className="mt-3 rounded-2xl border border-black/10 bg-[#fcfbf7] p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.25em] text-black/45">History</p>
          <p className="text-[11px] text-black/45">Last 7 days</p>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {last7.map((date, index) => {
            const ticked = habit.completions.includes(date);
            const dayNumber = parseLocalDateString(date).getDate();

            return (
              <div key={date} className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/45">
                  {dayLabels[index]}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                    ticked
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/60"
                  }`}
                >
                  {dayNumber}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}