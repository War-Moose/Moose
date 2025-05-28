import { tasksLeft, tasksDone, totalTasksDone, defaultTasks, taskLog, today, streak, longestStreak } from './state.js';
import { updateDisplays } from './ui.js';

// ——— TASK & CONFETTI & GLOW ———
export function completeTask() {
  if (tasksLeft > 0) tasksLeft--;
  tasksDone++;
  totalTasksDone++;
  taskLog[today] = tasksDone;
  localStorage.setItem("tasksLeft", tasksLeft);
  localStorage.setItem("tasksDone", tasksDone);
  localStorage.setItem("totalTasksDone", totalTasksDone);
  localStorage.setItem("taskLog", JSON.stringify(taskLog));

  const prevStr = streak, prevLong = longestStreak;
  updateDisplays();

  // Glow on streak change
  if (streak > prevStr) {
    const el = document.getElementById("streak");
    el.classList.add("streak-boost");
    setTimeout(() => el.classList.remove("streak-boost"), 800);
  }
  if (longestStreak > prevLong) {
    const elL = document.getElementById("longestStreak");
    elL.classList.add("streak-boost");
    setTimeout(() => elL.classList.remove("streak-boost"), 800);
  }

  // Confetti once you reach the daily goal
  if (taskLog[today] >= defaultTasks) {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#000000','#FFA500']
    });
  }
}

export function resetDay() {
  tasksDone = 0;
  tasksLeft = defaultTasks;
  delete taskLog[today];
  localStorage.setItem("tasksDone", tasksDone);
  localStorage.setItem("tasksLeft", tasksLeft);
  localStorage.setItem("taskLog", JSON.stringify(taskLog));
  updateDisplays();
}

export function advanceDay(offset) {
  const newDate = addDays(parseDate(today), offset);
  today = formatDate(newDate);
  if (today !== localStorage.getItem("taskDate")) {
    tasksDone = 0;
    tasksLeft = defaultTasks;
    localStorage.setItem("tasksDone", tasksDone);
    localStorage.setItem("tasksLeft", tasksLeft);
    localStorage.setItem("taskDate", today);
    localStorage.removeItem("streakLastCounted");
  }
  updateDisplays();
}
