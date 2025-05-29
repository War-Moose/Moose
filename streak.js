// streak.js
import { completionDates } from './storage.js';

export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function computeStreak() {
  let streak = 0;
  let date = new Date();
  while (true) {
    const d = formatDate(date);
    if (completionDates.has(d)) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function updateStreakDisplay() {
  const streak = computeStreak();
  document.getElementById('streak').textContent =
    `Current Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
}
