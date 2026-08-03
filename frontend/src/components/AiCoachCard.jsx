import { useState } from "react";
import { getCoaching } from "../api/coachapi";
import Buttons from "./Buttons";

export default function AiCoachCard() {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCoaching = async () => {
    setLoading(true);
    setError(null);
    setTips(null);

    try {
      const response = await getCoaching();
      setTips(response.data.tips);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-14">
      <div className="rounded-4xl border p-8 shadow-sm" style={{ backgroundColor: "#F5F3EC", borderColor: "#E5E3D9", color: "#1F1F1D" }}>
        <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "#8A8880" }}>
          AI Coach
        </p>

        <h2 className="text-2xl font-semibold mb-2">Your personal habit coach</h2>

        <p className="text-sm mb-6 max-w-2xl" style={{ color: "#5F5D55" }}>
          Review your habits and get motivational tips to keep your streaks
          alive.
        </p>

        <Buttons
          onClick={handleCoaching}
          disabled={loading}
          className="font-semibold hover:scale-[1.02]"
          style={{ backgroundColor: "#D85A30", color: "#FFFFFF", border: "1px solid #D85A30", boxShadow: "0 8px 20px rgba(216, 90, 48, 0.18)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#C24E28";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#D85A30";
          }}
        >
          {loading ? "Thinking..." : "Get AI Coaching"}
        </Buttons>

        {loading && (
          <div className="mt-6 rounded-3xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E3D9" }}>
            <p className="text-sm font-medium" style={{ color: "#D85A30" }}>
              Your coach is reviewing your habits...
            </p>
            <p className="mt-1 text-sm" style={{ color: "#5F5D55" }}>
              A few moments while we gather your momentum.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-3xl border p-4" style={{ backgroundColor: "#FFF7F3", borderColor: "#F2C7B6" }}>
            <p className="text-sm font-semibold" style={{ color: "#D85A30" }}>Unable to get coaching right now</p>
            <p className="mt-1 text-sm" style={{ color: "#3A3935" }}>{error}</p>
          </div>
        )}

        {tips && (
          <div className="mt-6 rounded-3xl border p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E3D9", color: "#3A3935" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#D85A30" }} />
              <p className="text-sm font-semibold" style={{ color: "#D85A30" }}>
                Coach tips
              </p>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#3A3935" }}>
              {tips}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
