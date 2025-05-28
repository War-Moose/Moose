// ——— TITLE BADGES ———
export function updateTitleBadges() {
  const leftId  = localStorage.getItem("titleBadgeLeft"),
        rightId = localStorage.getItem("titleBadgeRight"),
        map     = Object.fromEntries(badges.map(b => [b.id, b])),
        leftEl  = document.getElementById("badgeLeft"),
        rightEl = document.getElementById("badgeRight");
  if (map[leftId]) {
    leftEl.textContent = "🏅";
    leftEl.title = map[leftId].name;
  } else {
    leftEl.textContent = "";
  }
  if (map[rightId]) {
    rightEl.textContent = "🏅";
    rightEl.title = map[rightId].name;
  } else {
    rightEl.textContent = "";
  }
}

export function initTitleBadgeSelectors() {
  const selL = document.getElementById("selectLeftBadge"),
        selR = document.getElementById("selectRightBadge");
  badges.forEach(b => {
    const o1 = document.createElement("option");
    o1.value = b.id;
    o1.textContent = b.name;
    selL.appendChild(o1);
    selR.appendChild(o1.cloneNode(true));
  });
  selL.value = localStorage.getItem("titleBadgeLeft") || badges[0].id;
  selR.value = localStorage.getItem("titleBadgeRight") || badges[1].id;
  selL.onchange = e => {
    localStorage.setItem("titleBadgeLeft", e.target.value);
    updateTitleBadges();
  };
  selR.onchange = e => {
    localStorage.setItem("titleBadgeRight", e.target.value);
    updateTitleBadges();
  };
}
