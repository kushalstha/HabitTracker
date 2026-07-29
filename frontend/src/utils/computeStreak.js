// Computes the current streak of completed habits based on the provided completions array.
import { toLocalDateString } from "./date";

export function computeStreak(completions) {
  if (!completions || completions.length === 0) return 0;

  let streak = 0;
  let check = new Date();

  while (true) {
    const dateStr = toLocalDateString(check);

    if (completions.includes(dateStr)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}