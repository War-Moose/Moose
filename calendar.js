// calendar.js
import { completionDates } from './storage.js';
import { formatDate } from './streak.js';

export let currentYear, currentMonth;

export function renderCalendar(year, month) {
  currentYear = year;
  currentMonth = month;
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // blank tiles
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }
  // days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('day');
    const dStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    if (completionDates.has(dStr)) cell.classList.add('complete');
    else if (new Date(year, month, day) < new Date()) cell.classList.add('missed');
    cell.textContent = day;
    calendar.appendChild(cell);
  }
}
