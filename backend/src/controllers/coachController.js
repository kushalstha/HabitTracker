import * as habitModel from "../modules/habitModel.js";
import { computeStreak } from "../utils/streak.js";
import { getCoachTips } from "../modules/coachModel.js";

export async function getCoaching(req, res) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const habits = await habitModel.getAll(userId);

    if (habits.length === 0) {
      return res.status(400).json({
        message: "Add a habit first to get AI coaching",
      });
    }

    const habitsWithStreaks = habits.map((habit) => ({
      name: habit.name,
      frequency: habit.frequency,
      streak: computeStreak(habit.completions || []),
    }));

    const tips = await getCoachTips(habitsWithStreaks);

    return res.status(200).json({ tips });
  } catch (error) {
    const message = error?.message || "Something went wrong";
    const status = error?.status || 500;

    console.error(error);

    if (message.toLowerCase().includes("denied")) {
      return res.status(403).json({ message });
    }

    if (status === 429 || message.toLowerCase().includes("quota")) {
      return res.status(429).json({ message });
    }

    return res.status(status).json({ message });
  }
}
