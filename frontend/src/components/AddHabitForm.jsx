import { useState } from "react";
import Buttons from "./Buttons";

const getLast7Days = () => {
  const days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    days.push(`${yyyy}-${mm}-${dd}`);
  }

  return days;
};

export default function AddHabitForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);
  const [showBackfill, setShowBackfill] = useState(false);

  const last7Days = getLast7Days();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, frequency, selectedDays);
    onClose();
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-6 shadow-2xl">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">New habit</p>
          <h2 className="mt-1 text-2xl font-semibold text-black">Add a habit</h2>
          <p className="mt-1 text-sm text-black/60">Capture your routine in one clean step.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black/80">Habit name</label>
            <input
              className="w-full rounded-2xl border border-black/10 bg-[#f8f7f2] px-3 py-2.5 text-sm outline-none ring-0 focus:border-black"
              placeholder="e.g. Morning run"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black/80">Frequency</label>
            <select
              className="w-full rounded-2xl border border-black/10 bg-[#f8f7f2] px-3 py-2.5 text-sm outline-none focus:border-black"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <label className="flex items-center gap-2 rounded-2xl border border-black/10 bg-[#fcfbf7] px-3 py-3 text-sm text-black/75">
            <input
              type="checkbox"
              checked={showBackfill}
              onChange={(e) => {
                setShowBackfill(e.target.checked);
                if (!e.target.checked) setSelectedDays([]);
              }}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            Mark past days as completed
          </label>

          {showBackfill && (
            <div className="rounded-2xl border border-black/10 bg-[#fcfbf7] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-black/45">Select recent days</p>
              <div className="flex flex-wrap gap-2">
                {last7Days.map((day) => {
                  const label = new Date(day).toLocaleDateString("en", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`rounded-full border px-2.5 py-1.5 text-xs transition ${
                        selectedDays.includes(day)
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white text-black/75 hover:border-black/30"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Buttons type="button" variant="text" onClick={onClose}>
              Cancel
            </Buttons>
            <Buttons type="submit" variant="success">
              Add habit
            </Buttons>
          </div>
        </form>
      </div>
    </div>
  );
}