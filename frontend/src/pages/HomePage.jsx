import { createPortal } from "react-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import AiCoachCard from "../components/AiCoachCard";

export default function HomePage() {
  const {
    habits,
    showForm,
    setShowForm,
    toggleToday,
    addHabit,
    deleteHabit,
    isAuthenticated,
    userName,
  } = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {!isAuthenticated ? (
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-black/60 mb-4">Build habits with less friction</p>

          <h1 className="text-5xl md:text-6xl font-bold text-black max-w-3xl mx-auto leading-tight mb-4">
            Build habits that stick.
          </h1>

          <p className="text-base md:text-lg text-black/70 max-w-2xl mx-auto mb-10">
            Track daily progress, keep your streaks alive, and turn small actions into lasting change.
          </p>

          

          <div className="space-y-14">
            <section className="text-left">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-3">How it works</p>
                <h2 className="text-2xl font-semibold text-black">Three steps. No friction.</h2>
                <p className="text-sm text-black/60 mt-2 max-w-2xl">
                  The whole point is to make showing up easier than skipping.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-3xl border border-black/10 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-3">01</p>
                  <h3 className="font-semibold text-lg text-black mb-2">Add a habit</h3>
                  <p className="text-sm text-black/70">Name it, set how often — daily or a few days a week.</p>
                </div>
                <div className="rounded-3xl border border-black/10 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-3">02</p>
                  <h3 className="font-semibold text-lg text-black mb-2">Check it off</h3>
                  <p className="text-sm text-black/70">One tap when it’s done. That’s the whole interaction.</p>
                </div>
                <div className="rounded-3xl border border-black/10 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-3">03</p>
                  <h3 className="font-semibold text-lg text-black mb-2">Watch it grow</h3>
                  <p className="text-sm text-black/70">Your streak builds automatically — and you can see the pattern.</p>
                </div>
              </div>
            </section>

            <section className="text-left">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-3">What’s included</p>
                <h2 className="text-2xl font-semibold text-black">Everything a habit needs to survive</h2>
                <p className="text-sm text-black/60 mt-2 max-w-2xl">
                  Not another tracker you’ll abandon in a week.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-black/10 p-5">
                  <h3 className="font-semibold text-black mb-2">Streak tracking</h3>
                  <p className="text-sm text-black/70">See exactly how many days in a row you’ve shown up.</p>
                </div>
                <div className="rounded-3xl border border-black/10 p-5">
                  <h3 className="font-semibold text-black mb-2">AI coach</h3>
                  <p className="text-sm text-black/70">Get subtle nudges before a streak breaks.</p>
                </div>
                <div className="rounded-3xl border border-black/10 p-5">
                  <h3 className="font-semibold text-black mb-2">Flexible schedules</h3>
                  <p className="text-sm text-black/70">Daily, weekdays only, or custom — your habit, your rules.</p>
                </div>
                <div className="rounded-3xl border border-black/10 p-5">
                  <h3 className="font-semibold text-black mb-2">Weekly summaries</h3>
                  <p className="text-sm text-black/70">A quiet recap every Sunday. No guilt, just data.</p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <p className="text-base italic text-black/70 max-w-2xl mx-auto">
                “I’ve tried five habit apps. This is the first one where I actually kept the streak past a month.”
              </p>
              <p className="text-sm text-black/50 mt-4">— Early user, Workout + Read Book streaks: 34 days</p>
            </section>

            <section className="rounded-4xl bg-black/5 p-8 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-black/60 mb-3">Start your first streak today</p>
              <p className="text-lg font-semibold text-black mb-6">Free to use. No credit card needed.</p>
              <button
                onClick={() => navigate("/auth?mode=register")}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition"
              >
                Sign up
              </button>
            </section>
          </div>
        </div>
      ) : null}

      {isAuthenticated ? (
        <>
          <div className="max-w-5xl mx-auto px-4 py-14 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black max-w-3xl mx-auto leading-tight mb-4">
              Build habits that stick.
            </h1>

            <p className="text-base md:text-lg text-black/70 max-w-2xl mx-auto mb-4">
              Track daily progress, keep your streaks alive, and turn small actions into lasting change.
            </p>

            <p className="text-sm uppercase tracking-[0.4em] text-black/60">Welcome, {userName}</p>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
            >
              + Add Habit
            </button>
          </div>

          <HabitList
            habits={habits}
            onToggle={toggleToday}
            onDelete={deleteHabit}
            isAuthenticated={isAuthenticated}
          />

          <div className="mt-12">
            <AiCoachCard />
          </div>
        </>
      ) : null}

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
