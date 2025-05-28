// ——— BADGES INIT ———
export let badges = JSON.parse(localStorage.getItem("badges"));
if (!Array.isArray(badges) || badges.length !== 3) {
  badges = [
    { id:"badge_first",   name:"First Task",   description:"Complete 1 task",        unlocked:false },
    { id:"badge_five",    name:"Five Tasks",   description:"Complete 5 total tasks", unlocked:false },
    { id:"badge_streak3", name:"3-Day Streak", description:"Achieve a 3-day streak", unlocked:false }
  ];
  localStorage.setItem("badges", JSON.stringify(badges));
}

// ——— BADGES ———
export function checkBadges() {
  let updated = false;
  badges.forEach(b => {
    if (!b.unlocked) {
      if (b.id === "badge_first" && totalTasksDone >= 1) {
        b.unlocked = true; showBadgePopup(b.name); updated = true;
      }
      else if (b.id === "badge_five" && totalTasksDone >= 5) {
        b.unlocked = true; showBadgePopup(b.name); updated = true;
      }
      else if (b.id === "badge_streak3" && streak >= 3) {
        b.unlocked = true; showBadgePopup(b.name); updated = true;
      }
    }
  });
  if (updated) {
    localStorage.setItem("badges", JSON.stringify(badges));
  }
}

export function initializeBadges() {
  const grid = document.getElementById("badgeGrid");
  grid.innerHTML = "";
  badges.forEach(b => {
    const div = document.createElement("div");
    div.style.opacity = b.unlocked ? "1" : "0.3";
    div.style.cursor = "pointer";
    div.innerHTML = `
      <div style="font-size:2em;">🏅</div>
      <div style="font-size:0.8em;">${b.name}</div>
    `;
    div.onclick = () => alert(b.unlocked ? b.description : `Locked: ${b.description}`);
    grid.appendChild(div);
  });
}

export function showBadgePopup(name) {
  const p = document.getElementById("badgePopup");
  p.textContent = `🏆 Badge Unlocked: ${name}!`;
  p.style.display = "block";
  setTimeout(() => p.style.display = "none", 3000);
}
