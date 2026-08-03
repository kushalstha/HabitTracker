// Computes the current streak of completed habits based on the provided completions array.
import { parseLocalDateString, toLocalDateString } from "./date";

export function computeStreak(completions) {
  const normalizedCompletions = [...new Set((completions || []).filter(Boolean))].sort();

  if (normalizedCompletions.length === 0) return 0;

  let streak = 0;
  const latestCompletion = parseLocalDateString(
    normalizedCompletions[normalizedCompletions.length - 1]
  );
  let check = new Date(latestCompletion);
  check.setHours(0, 0, 0, 0);

  while (true) {
    const dateStr = toLocalDateString(check);

    if (!normalizedCompletions.includes(dateStr)) {
      break;
    }

    streak += 1;
    check.setDate(check.getDate() - 1);
  }

  return streak;
}