import HabitCard from "./HabitCard";

export default function HabitList({ habits, onToggle, onDelete, isAuthenticated }) {
  return (
    <div
      className="mx-auto max-w-6xl"
      style={{
        maxHeight: "70vh",
        overflowY: "auto",
        padding: "0.5rem 0.5rem 1rem",
        scrollbarWidth: "thin",
        scrollbarColor: "#D6D3D1 #F5F5F4",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          alignItems: "start",
        }}
      >
        {habits.map((habit) => (
          <div key={habit._id}>
            <HabitCard
              habit={habit}
              onToggle={onToggle}
              onDelete={onDelete}
              isAuthenticated={isAuthenticated}
            />
          </div>
        ))}
      </div>
    </div>
  );
}