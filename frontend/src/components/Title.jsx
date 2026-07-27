import { useNavigate } from "react-router-dom";

export default function Title({ isAuthenticated, logout }) {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="w-screen relative left-1/2 right-1/2 mx-[-50vw] flex items-center justify-between bg-white border-b border-black/10 px-6 py-4">
        <h1
          className="text-black font-semibold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Habit Tracker
        </h1>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="text-black font-medium px-4 py-2 rounded-lg border border-black/10 hover:bg-black/5 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/auth?mode=login")}
                className="text-black font-medium px-4 py-2 rounded-lg hover:bg-black/5 transition"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => navigate("/auth?mode=register")}
                className="text-black font-medium px-4 py-2 rounded-lg border border-black hover:bg-black/5 transition"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}