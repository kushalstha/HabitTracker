// Date helpers that use the user's local timezone and return date-only strings (YYYY-MM-DD)
export function toLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDateString(dateStr) {
  // dateStr expected as YYYY-MM-DD
  const [year, month, day] = dateStr.split("-").map((s) => parseInt(s, 10));
  return new Date(year, month - 1, day);
}

export function weekStartLocalMillis(dateStr) {
  const d = parseLocalDateString(dateStr);
  d.setHours(0, 0, 0, 0);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay()); // Sunday start
  start.setHours(0, 0, 0, 0);
  return start.getTime();
}

export function isSameLocalWeek(dateStrA, dateStrB) {
  return weekStartLocalMillis(dateStrA) === weekStartLocalMillis(dateStrB);
}
