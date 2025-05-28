// ——— STREAK LOGIC ———
export function calculateLongestStreak() {
  const doneDates = Object.keys(taskLog)
    .filter(d => taskLog[d] >= defaultTasks)
    .sort();
  let maxS = 0, temp = 0, prev = null;
  doneDates.forEach(iso => {
    if (prev) {
      const diff = Math.round((new Date(iso) - new Date(prev)) / 86400000);
      temp = (diff === 1 ? temp + 1 : 1);
    } else {
      temp = 1;
    }
    maxS = Math.max(maxS, temp);
    prev = iso;
  });
  return maxS;
}

export function updateStreakFromCalendar() {
  // 1) Check yesterday
  const y = parseDate(today);
  y.setDate(y.getDate() - 1);
  const prevKey  = formatDate(y);
  const prevDone = (taskLog[prevKey] || 0) >= defaultTasks;

  // 2) Reset if missed yesterday
  if (!prevDone) streak = 0;

  // 3) Count tasks done today
  const countToday = taskLog[today] || 0;

  // 4) Only bump when hitting exactly defaultTasks, once
  if (
    countToday === defaultTasks &&
    localStorage.getItem("streakLastCounted") !== today
  ) {
    streak++;
    localStorage.setItem("streakLastCounted", today);
  }

  // 5) Recompute longest streak
  longestStreak = calculateLongestStreak();

  // 6) Persist
  localStorage.setItem("streak", streak);
  localStorage.setItem("longestStreak", longestStreak);
}
