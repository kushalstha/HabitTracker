import HabitCard from "./HabitCard";

export default function HabitList({ habits, onToggle, onDelete, isAuthenticated }) {
  return (
    <div
      className="mx-auto"
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(4, auto)",
        gap: "1rem",
        alignItems: "start",
        justifyContent: "flex-start",
        maxWidth: "1000px",
        padding: "0 1rem",
        marginLeft: "2rem",
      }}
    >
      {habits.map((habit) => (
        <div key={habit._id} style={{ width: "320px" }}>
          <HabitCard
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
            isAuthenticated={isAuthenticated}
          />
        </div>
      ))}
    </div>
  );
}