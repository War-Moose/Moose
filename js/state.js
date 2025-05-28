import { formatDate } from './utils.js';

// ——— CORE STATE & STORAGE ———
export const defaultTasks = 3;
export let today         = formatDate(new Date());
export let tasksLeft      = parseInt(localStorage.getItem("tasksLeft"))      || defaultTasks;
export let tasksDone      = parseInt(localStorage.getItem("tasksDone"))      || 0;
export let totalTasksDone = parseInt(localStorage.getItem("totalTasksDone")) || 0;
export let streak         = parseInt(localStorage.getItem("streak"))         || 0;
export let longestStreak  = parseInt(localStorage.getItem("longestStreak"))  || 0;
export const taskLog      = JSON.parse(localStorage.getItem("taskLog")   || "{}");
export let savedDate      = localStorage.getItem("taskDate");

// On new day, reset tasks and clear streak‐count flag
if (savedDate !== today) {
  tasksDone = 0;
  tasksLeft = defaultTasks;
  localStorage.setItem("tasksDone", tasksDone);
  localStorage.setItem("tasksLeft", tasksLeft);
  localStorage.setItem("taskDate", today);
  localStorage.removeItem("streakLastCounted");
}
