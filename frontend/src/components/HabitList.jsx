import HabitCard from "./HabitCard";

export default function HabitList({ habits, onToggle, onDelete }) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}