// ——— UPDATE ALL DISPLAYS ———
export function updateDisplays() {
  document.getElementById("currentDate").textContent = today;
  document.getElementById("tasksLeft").textContent   = tasksLeft;
  document.getElementById("tasksDone").textContent   = tasksDone;
  document.getElementById("totalTasksDone").textContent = totalTasksDone;
  updateStreakFromCalendar();
  document.getElementById("streak").textContent      = streak;
  document.getElementById("longestStreak").textContent = longestStreak;
  drawCalendar();
  checkBadges();
  initializeBadges();
  updateTitleBadges();
}
