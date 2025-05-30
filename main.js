// main.js
import { completionDates, saveData } from './storage.js';
import { formatDate, updateStreakDisplay } from './streak.js';
import { renderCalendar, currentYear, currentMonth } from './calendar.js';
import { renderBadges } from './badges.js';
import { setupDebugMenu } from './debug.js';

const completeBtn = document.getElementById('completeTaskBtn');
completeBtn.addEventListener('click', () => {
  const today = new Date();
  const dStr = formatDate(today);
  if (completionDates.has(dStr)) completionDates.delete(dStr);
  else completionDates.add(dStr);
  saveData();
  updateStreakDisplay();
  renderCalendar(currentYear, currentMonth);
  renderBadges();
});

window.onload = () => {
  updateStreakDisplay();
  const now = new Date();
  renderCalendar(now.getFullYear(), now.getMonth());
  renderBadges();
  setupDebugMenu();
};
