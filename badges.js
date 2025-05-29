// badges.js
import { completionDates } from './storage.js';
import { computeStreak } from './streak.js';

const badgesConfig = [
  { id: 'first',    name: 'First Task Complete',  cond: () => completionDates.size >= 1 },
  { id: 'five',     name: '5 Tasks Complete',     cond: () => completionDates.size >= 5 },
  { id: 'threeDay', name: '3-Day Streak',         cond: () => computeStreak() >= 3 },
];

export function renderBadges() {
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
