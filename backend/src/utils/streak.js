export function toLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function computeStreak(completions = []) {
  if (!Array.isArray(completions) || completions.length === 0) return 0;

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
