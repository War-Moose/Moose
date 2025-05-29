// debug.js
import { completionDates, saveData } from './storage.js';
import { formatDate } from './streak.js';
import { updateStreakDisplay } from './streak.js';
import { renderCalendar } from './calendar.js';
import { renderBadges } from './badges.js';

export function setupDebugMenu() {
  const modal = document.getElementById('debugModal');
  document.getElementById('menuBtn').onclick = () => {
    modal.style.display = 'flex';
  };
  modal.querySelector('.close-button').onclick = () => {
    modal.style.display = 'none';
  };
  document.getElementById('markYesterday').onclick = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    toggleDate(d);
  };
  document.getElementById('toggleDate').onclick = () => {
    const input = document.getElementById('debugDate');
    if (input.value) {
      toggleDate(new Date(input.value));
    }
  };
}

function toggleDate(date) {
  const dStr = formatDate(date);
  if (completionDates.has(dStr)) {
    completionDates.delete(dStr);
  } else {
    completionDates.add(dStr);
  }
  saveData();
  updateStreakDisplay();
  renderCalendar(currentYear, currentMonth);
  renderBadges();
}
