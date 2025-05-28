import { parseDate, formatDate, addDays } from './utils.js';
import './state.js';
import { calculateLongestStreak, updateStreakFromCalendar } from './streak.js';
import { checkBadges, initializeBadges, showBadgePopup } from './badges.js';
import { drawCalendar } from './calendar.js';
import { updateTitleBadges, initTitleBadgeSelectors } from './titleBadges.js';
import { updateDisplays } from './ui.js';
import * as TaskActions from './taskActions.js';
import { startWorkPhase, togglePomodoro } from './pomodoro.js';
import { changeWeek, changeMonth, changeYear, toggleAnalytics } from './analytics.js';

document.getElementById('importInput').addEventListener('change', TaskActions.importTrackerData);
document.getElementById('pomStartBtn').addEventListener('click', () => {
  if (!pomRunning) {
    pomRunning = true;
    document.getElementById('pomStartBtn').textContent = 'Running';
    startWorkPhase();
  }
});
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'd') TaskActions.toggleDarkMode();
  if (e.key.toLowerCase() === 'm') TaskActions.toggleMenu();
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

// Expose legacy inline‐onclick functions
window.completeTask     = TaskActions.completeTask;
window.resetDay         = TaskActions.resetDay;
window.advanceDay       = TaskActions.advanceDay;
window.exportTrackerData= TaskActions.exportTrackerData;
window.resetTotalTasks  = TaskActions.resetTotalTasks;
window.resetBadges      = TaskActions.resetBadges;
window.toggleMenu       = TaskActions.toggleMenu;
window.toggleBadgeModal = TaskActions.toggleBadgeModal;
window.toggleDarkMode   = TaskActions.toggleDarkMode;
window.togglePomodoro   = togglePomodoro;
window.toggleAnalytics  = toggleAnalytics;
window.changeWeek       = changeWeek;
window.changeMonth      = changeMonth;
window.changeYear       = changeYear;

initTitleBadgeSelectors();
updateDisplays();
