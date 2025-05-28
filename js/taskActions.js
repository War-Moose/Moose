// ——— TASK & CONFETTI & GLOW ———
export function completeTask() {
  if (tasksLeft > 0) tasksLeft--;
  tasksDone++; totalTasksDone++;
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
  if (tasksDone >= defaultTasks) {
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

export function resetTotalTasks() {
  totalTasksDone = 0;
  localStorage.setItem("totalTasksDone", 0);
  // reset only total-based badges
  badges.forEach(b => {
    if (b.id === "badge_first" || b.id === "badge_five") {
      b.unlocked = false;
    }
  });
  localStorage.setItem("badges", JSON.stringify(badges));
  updateDisplays();
  alert("Total tasks completed and relevant badges have been reset.");
}

export function resetBadges() {
  badges.forEach(b => b.unlocked = false);
  localStorage.setItem("badges", JSON.stringify(badges));
  initializeBadges();
}

export function advanceDay(offset) {
  const d = addDays(parseDate(today), offset);
  today = formatDate(d);
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

export function exportTrackerData() {
  const data = {
    tasksLeft,
    tasksDone,
    totalTasksDone,
    streak,
    longestStreak,
    taskLog,
    badges
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = `backup-${today}.json`;
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
    tasksLeft      = data.tasksLeft      || tasksLeft;
    tasksDone      = data.tasksDone      || tasksDone;
    totalTasksDone = data.totalTasksDone || totalTasksDone;
    streak         = data.streak         || streak;
    longestStreak  = data.longestStreak  || longestStreak;
    Object.assign(taskLog, data.taskLog);
    badges = data.badges || badges;
    localStorage.setItem("tasksLeft", tasksLeft);
    localStorage.setItem("tasksDone", tasksDone);
    localStorage.setItem("totalTasksDone", totalTasksDone);
    localStorage.setItem("streak", streak);
    localStorage.setItem("longestStreak", longestStreak);
    localStorage.setItem("taskLog", JSON.stringify(taskLog));
    localStorage.setItem("badges", JSON.stringify(badges));
    localStorage.setItem("taskDate", today);
    localStorage.removeItem("streakLastCounted");
    updateDisplays();
    alert("✅ Imported successfully");
  };
  reader.readAsText(file);
}
