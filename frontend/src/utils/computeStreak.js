// Computes the current streak of completed habits based on the provided completions array.
export function computeStreak(completions) {
  if (completions.length === 0) return 0;

  let streak = 0;
  let check = new Date();

  while (true) {
    const dateStr = check.toISOString().split("T")[0];

    if (completions.includes(dateStr)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}