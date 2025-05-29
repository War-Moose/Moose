// storage.js
export const STORAGE_KEY = 'completionDates';
export let completionDates = new Set(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
);

export function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...completionDates])
  );
}
