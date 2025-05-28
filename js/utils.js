// ——— HELPERS ———
export function parseDate(str) {
  const [y,m,d] = str.split('-').map(Number);
  return new Date(y, m-1, d);
}
export function formatDate(dt) {
  const y = dt.getFullYear(),
        mo = String(dt.getMonth()+1).padStart(2,'0'),
        da = String(dt.getDate()).padStart(2,'0');
  return `${y}-${mo}-${da}`;
}
export function addDays(dt, n) {
  const r = new Date(dt);
  r.setDate(r.getDate() + n);
  return r;
}
export const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
