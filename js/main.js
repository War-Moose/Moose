import {
  completeTask,
  resetDay,
  advanceDay,
  exportTrackerData,
  importTrackerData,
  resetTotalTasks,
  resetBadges,
  toggleMenu,
  toggleBadgeModal,
  toggleDarkMode
} from './taskActions.js';
import { startWorkPhase, togglePomodoro } from './pomodoro.js';
import { changeWeek, changeMonth, changeYear, toggleAnalytics } from './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  // Task buttons
  document.getElementById('btn-complete').addEventListener('click', completeTask);
  document.getElementById('btn-reset-day').addEventListener('click', resetDay);
  document.getElementById('btn-prev-day').addEventListener('click', () => advanceDay(-1));
  document.getElementById('btn-next-day').addEventListener('click', () => advanceDay(1));
  document.getElementById('btn-export').addEventListener('click', exportTrackerData);
  document.getElementById('importInput').addEventListener('change', importTrackerData);
  document.getElementById('btn-reset-total').addEventListener('click', resetTotalTasks);
  document.getElementById('btn-reset-badges').addEventListener('click', resetBadges);

  // Settings toggles
  document.getElementById('btn-toggle-menu').addEventListener('click', () => toggleMenu());
  document.getElementById('btn-toggle-badge-modal').addEventListener('click', () => toggleBadgeModal());
  document.getElementById('btn-toggle-dark').addEventListener('click', () => toggleDarkMode());

  // Pomodoro
  document.getElementById('btn-pomodoro').addEventListener('click', () => togglePomodoro());
  document.getElementById('pomStartBtn').addEventListener('click', () => startWorkPhase());

  // Analytics
  document.getElementById('btn-analytics').addEventListener('click', () => toggleAnalytics());
  document.getElementById('week-prev').addEventListener('click', () => changeWeek(-1));
  document.getElementById('week-next').addEventListener('click', () => changeWeek(1));
  document.getElementById('month-prev').addEventListener('click', () => changeMonth(-1));
  document.getElementById('month-next').addEventListener('click', () => changeMonth(1));
  document.getElementById('year-prev').addEventListener('click', () => changeYear(-1));
  document.getElementById('year-next').addEventListener('click', () => changeYear(1));

  // Final initialization
  initTitleBadgeSelectors();
  updateDisplays();
});
