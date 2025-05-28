import { state, defaultTasks } from './state.js';
import { updateDisplays } from './ui.js';
import { parseDate, formatDate, addDays } from './utils.js';
import { updateStreakFromCalendar } from './streak.js';
import { showBadgePopup } from './badges.js';

// ——— TASK & CONFETTI & GLOW ———
export function completeTask() {
  if (state.tasksLeft > 0) state.tasksLeft--;
  state.tasksDone++;
  state.totalTasksDone++;
  state.taskLog[state.today] = state.tasksDone;
  localStorage.setItem("tasksLeft", state.tasksLeft);
  localStorage.setItem("tasksDone", state.tasksDone);
  localStorage.setItem("totalTasksDone", state.totalTasksDone);
  localStorage.setItem("taskLog", JSON.stringify(state.taskLog));

  const prevStr = state.streak;
  const prevLong = state.longestStreak;

  // update streak and displays
  updateStreakFromCalendar();
  updateDisplays();

  // Glow on streak change
  if (state.streak > prevStr) {
    const el = document.getElementById("streak");
    el.classList.add("streak-boost");
    setTimeout(() => el.classList.remove("streak-boost"), 800);
  }
  if (state.longestStreak > prevLong) {
    const elL = document.getElementById("longestStreak");
    elL.classList.add("streak-boost");
    setTimeout(() => elL.classList.remove("streak-boost"), 800);
  }

  // Confetti once you reach the daily goal
  if (state.tasksDone >= defaultTasks) {
    window.confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#000000','#FFA500']
    });
  }
}

export function resetDay() {
  state.tasksDone = 0;
  state.tasksLeft = defaultTasks;
  delete state.taskLog[state.today];
  localStorage.setItem("tasksDone", state.tasksDone);
  localStorage.setItem("tasksLeft", state.tasksLeft);
  localStorage.setItem("taskLog", JSON.stringify(state.taskLog));
  updateDisplays();
}

export function advanceDay(offset) {
  const newDate = addDays(parseDate(state.today), offset);
  state.today = formatDate(newDate);
  if (state.today !== localStorage.getItem("taskDate")) {
    state.tasksDone = 0;
    state.tasksLeft = defaultTasks;
    localStorage.setItem("tasksDone", state.tasksDone);
    localStorage.setItem("tasksLeft", state.tasksLeft);
    localStorage.setItem("taskDate", state.today);
    localStorage.removeItem("streakLastCounted");
  }
  updateDisplays();
}

export function exportTrackerData() {
  const data = {
    tasksLeft: state.tasksLeft,
    tasksDone: state.tasksDone,
    totalTasksDone: state.totalTasksDone,
    streak: state.streak,
    longestStreak: state.longestStreak,
    taskLog: state.taskLog,
    badges: state.badges
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `backup-${state.today}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function importTrackerData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const data = JSON.parse(e.target.result);
    state.tasksLeft      = data.tasksLeft      || state.tasksLeft;
    state.tasksDone      = data.tasksDone      || state.tasksDone;
    state.totalTasksDone = data.totalTasksDone || state.totalTasksDone;
    state.streak         = data.streak         || state.streak;
    state.longestStreak  = data.longestStreak  || state.longestStreak;
    Object.assign(state.taskLog, data.taskLog);
    state.badges = data.badges || state.badges;
    localStorage.setItem("tasksLeft", state.tasksLeft);
    localStorage.setItem("tasksDone", state.tasksDone);
    localStorage.setItem("totalTasksDone", state.totalTasksDone);
    localStorage.setItem("streak", state.streak);
    localStorage.setItem("longestStreak", state.longestStreak);
    localStorage.setItem("taskLog", JSON.stringify(state.taskLog));
    localStorage.setItem("badges", JSON.stringify(state.badges));
    localStorage.setItem("taskDate", state.today);
    localStorage.removeItem("streakLastCounted");
    updateDisplays();
    alert("✅ Imported successfully");
  };
  reader.readAsText(file);
}
