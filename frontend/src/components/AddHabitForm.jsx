import { useState } from "react";
import Buttons from "./Buttons";

export default function AddHabitForm({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, frequency);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-80">
        <h2 className="text-xl font-bold mb-3">Add Habit</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="border w-full p-2 mb-3 rounded"
            placeholder="Habit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border w-full p-2 mb-3 rounded"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <div className="flex justify-between">
            <Buttons type="button" variant="text" onClick={onClose}>
              Cancel

            </Buttons>
            <Buttons type="submit" variant="primary">
            
            <button className="bg-green-600 text-white px-3 py-1 rounded">
              Add
            </button>
            </Buttons>
          </div>
        </form>
      </div>
    </div>
  );
}