export default function Title() {
  return (
    <div>
      <nav className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center justify-between bg-black px-6 py-4">
        <h1 className="text-white font-bold text-lg">Habit Tracker</h1>

        <div className="flex items-center gap-3">
          <button className="text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800">
            Log In
          </button>
          <button className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-600">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
}