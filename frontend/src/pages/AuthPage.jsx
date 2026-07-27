import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "../api/authapi.js";
import Buttons from "../components/Buttons";

export default function AuthPage({ onAuthSuccess }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get("mode") === "register" ? false : true;

  const [isLogin, setIsLogin] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { email, password };
      const response = isLogin
        ? await login(payload)
        : await register({ name, ...payload });

      const token = response.data?.data?.token;
      if (!token) {
        throw new Error("Authentication failed");
      }

      localStorage.setItem("token", token);
      const userName = response.data?.data?.name || "";
      if (userName) {
        localStorage.setItem("userName", userName);
      }
      onAuthSuccess(userName);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to the Habit Tracker! Please {isLogin ? "log in" : "register"} to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-2 rounded"
            />
          )}

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-2 rounded"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-2 rounded"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex items-center justify-between gap-2">
            <Buttons type="submit" variant="primary">
              {isLogin ? "Login" : "Register"}
            </Buttons>
            <button
              type="button"
              className="text-sm text-gray-500 underline"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin
                ? "Create an account"
                : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
