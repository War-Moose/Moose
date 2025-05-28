// ——— DRAW CALENDAR ———
export function drawCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";
  const ref = parseDate(today);
  const Y = ref.getFullYear(), M = ref.getMonth();
  const firstDay = new Date(Y, M, 1).getDay();
  // empty slots to align Sunday-first
  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement("div");
    e.className = "day";
    e.style.visibility = "hidden";
    cal.appendChild(e);
  }
  const dim = new Date(Y, M+1, 0).getDate();
  for (let d=1; d<=dim; d++) {
    const key = formatDate(new Date(Y, M, d));
    const v   = taskLog[key] || 0;
    const box = document.createElement("div");
    box.className = "day " + (
      v===0 ? "white" :
      v===1 ? "red" :
      v===2 ? "blue" : "black"
    );
    box.textContent = d;
    cal.appendChild(box);
  }
}
