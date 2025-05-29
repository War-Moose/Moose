const STORAGE_KEY = 'completionDates';
let completionDates = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

// Utility to format Date to YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Save to localStorage
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completionDates]));
}

// Compute current streak
function computeStreak() {
  let streak = 0;
  let date = new Date();
  while (true) {
    const d = formatDate(date);
    if (completionDates.has(d)) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else break;
  }
  return streak;
}

// Update streak display
function updateStreak() {
  const streak = computeStreak();
  document.getElementById('streak').textContent =
    `Current Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
}

// Render calendar
let currentYear, currentMonth;
function renderCalendar(year, month) {
  currentYear = year;
  currentMonth = month;
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // blank slots
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('day');
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (completionDates.has(dStr)) {
      cell.classList.add('complete');
    } else {
      const checkDate = new Date(year, month, day);
      if (checkDate < new Date()) cell.classList.add('missed');
    }
    cell.textContent = day;
    calendar.appendChild(cell);
  }
}

// Badges logic
const badgesConfig = [
  { id: 'first',     name: 'First Task Complete',   cond: () => completionDates.size >= 1 },
  { id: 'five',      name: '5 Tasks Complete',      cond: () => completionDates.size >= 5 },
  { id: 'threeDay',  name: '3-Day Streak',          cond: () => computeStreak() >= 3 },
  // add more here...
];

function renderBadges() {
  const container = document.getElementById('badges');
  container.innerHTML = '';
  badgesConfig.forEach(b => {
    const el = document.createElement('div');
    el.classList.add('badge');
    if (b.cond()) el.classList.add('unlocked');
    el.textContent = b.name;
    container.appendChild(el);
  });
}

// Toggle completion for a date
function markDate(date) {
  const dStr = formatDate(date);
  if (completionDates.has(dStr)) completionDates.delete(dStr);
  else completionDates.add(dStr);
  saveData();
  updateStreak();
  renderCalendar(currentYear, currentMonth);
  renderBadges();
}

// Complete today’s task
document.getElementById('completeTaskBtn')
  .addEventListener('click', () => markDate(new Date()));

// Debug menu
const debugModal = document.getElementById('debugModal');
document.getElementById('menuBtn').onclick = () => debugModal.style.display = 'flex';
debugModal.querySelector('.close-button').onclick = () => debugModal.style.display = 'none';

document.getElementById('markYesterday').onclick = () => {
  const d = new Date(); d.setDate(d.getDate() - 1);
  markDate(d);
};
document.getElementById('toggleDate').onclick = () => {
  const input = document.getElementById('debugDate');
  if (input.value) markDate(new Date(input.value));
};

// Initialize on load
window.onload = () => {
  updateStreak();
  const now = new Date();
  renderCalendar(now.getFullYear(), now.getMonth());
  renderBadges();
};
