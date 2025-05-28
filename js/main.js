import { completeTask, resetDay, advanceDay, exportTrackerData, importTrackerData, resetTotalTasks, resetBadges, toggleMenu, toggleBadgeModal, toggleDarkMode } from './taskActions.js';
import { startWorkPhase, togglePomodoro } from './pomodoro.js';
import { changeWeek, changeMonth, changeYear, toggleAnalytics } from './analytics.js';
import { initTitleBadgeSelectors } from './titleBadges.js';
import { updateDisplays } from './ui.js';

console.log("🟢 main.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI
  initTitleBadgeSelectors();
  updateDisplays();

  // Task buttons
  document.getElementById('btn-complete').addEventListener('click', () => {
    console.log('Complete Task clicked');
    completeTask();
    updateDisplays();
  });
  document.getElementById('btn-reset-day').addEventListener('click', () => {
    console.log('Reset Day clicked');
    resetDay();
    updateDisplays();
  });
  document.getElementById('btn-prev-day').addEventListener('click', () => {
    console.log('Advance Day -1 clicked');
    advanceDay(-1);
    updateDisplays();
  });
  document.getElementById('btn-next-day').addEventListener('click', () => {
    console.log('Advance Day +1 clicked');
    advanceDay(1);
    updateDisplays();
  });

  // Backup / Import
  document.getElementById('btn-export').addEventListener('click', () => {
    console.log('Export clicked');
    exportTrackerData();
  });
  document.getElementById('btn-import').addEventListener('click', () => {
    console.log('Import button clicked');
    document.getElementById('importInput').click();
  });
  document.getElementById('importInput').addEventListener('change', evt => {
    console.log('File imported');
    importTrackerData(evt);
    updateDisplays();
  });

  // Settings
  document.getElementById('btn-reset-total').addEventListener('click', () => {
    console.log('Reset Total Tasks clicked');
    resetTotalTasks();
    updateDisplays();
  });
  document.getElementById('btn-reset-badges').addEventListener('click', () => {
    console.log('Reset Badges clicked');
    resetBadges();
  });
  document.getElementById('btn-toggle-dark').addEventListener('click', () => {
    console.log('Toggle Dark Mode clicked');
    toggleDarkMode();
  });
  document.getElementById('btn-toggle-menu').addEventListener('click', () => toggleMenu());
  document.getElementById('btn-close-menu').addEventListener('click', () => toggleMenu(false));

  // Badge Modal
  document.getElementById('btn-toggle-badge-modal').addEventListener('click', () => toggleBadgeModal());
  document.getElementById('btn-close-badge-modal').addEventListener('click', () => toggleBadgeModal(false));

  // Pomodoro
  document.getElementById('btn-pomodoro').addEventListener('click', () => togglePomodoro());
  document.getElementById('pomStartBtn').addEventListener('click', () => {
    console.log('Pomodoro Start clicked');
    startWorkPhase();
  });
  document.getElementById('btn-close-pomodoro').addEventListener('click', () => togglePomodoro(false));

  // Analytics
  document.getElementById('btn-analytics').addEventListener('click', () => toggleAnalytics());
  document.getElementById('week-prev').addEventListener('click', () => changeWeek(-1));
  document.getElementById('week-next').addEventListener('click', () => changeWeek(1));
  document.getElementById('month-prev').addEventListener('click', () => changeMonth(-1));
  document.getElementById('month-next').addEventListener('click', () => changeMonth(1));
  document.getElementById('year-prev').addEventListener('click', () => changeYear(-1));
  document.getElementById('year-next').addEventListener('click', () => changeYear(1));
  document.getElementById('btn-close-analytics').addEventListener('click', () => toggleAnalytics(false));
});
