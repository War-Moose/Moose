let weeklyChart, monthlyChart, yearChart;
let weekOffset = 0, monthOffset = 0, yearOffset = 0;

export function changeWeek(delta) {
  weekOffset += delta;
  renderAnalytics();
}
export function changeMonth(delta) {
  monthOffset += delta;
  renderAnalytics();
}
export function changeYear(delta) {
  yearOffset += delta;
  renderAnalytics();
}

export function renderAnalytics() {
  const ref = parseDate(today);

  // Weekly (Sun→Sat)
  const refWeek = addDays(ref, weekOffset * 7);
  const startSun = addDays(refWeek, -refWeek.getDay());
  const labels7 = [], data7 = [];
  for (let i=0; i<7; i++) {
    const d = addDays(startSun, i);
    labels7.push(`${weekdays[d.getDay()]} ${d.getMonth()+1}/${d.getDate()}`);
    data7.push(taskLog[formatDate(d)] || 0);
  }
  document.getElementById('weeklyLabel').textContent =
    `Week of ${startSun.getMonth()+1}/${startSun.getDate()}`;

  // Monthly (1→N)
  const refMon = new Date(ref.getFullYear(), ref.getMonth()+monthOffset, 1);
  const Y = refMon.getFullYear(), M = refMon.getMonth();
  const dim = new Date(Y, M+1, 0).getDate();
  const labelsM = [], dataM = [];
  for (let d=1; d<=dim; d++) {
    labelsM.push(String(d));
    dataM.push(taskLog[formatDate(new Date(Y, M, d))] || 0);
  }
  document.getElementById('monthlyLabel').textContent =
    refMon.toLocaleDateString(undefined, { month:'long', year:'numeric' });

  // Yearly (Jan→Dec)
  const refYear = new Date(ref.getFullYear() + yearOffset, 0, 1);
  const labelsY = [], dataY = [];
  for (let m=0; m<12; m++) {
    const d = new Date(refYear.getFullYear(), m, 1);
    labelsY.push(d.toLocaleDateString(undefined, { month:'short' }));
    let sum = 0;
    Object.entries(taskLog).forEach(([k,v]) => {
      const dt = parseDate(k);
      if (dt.getFullYear() === refYear.getFullYear() && dt.getMonth() === m) {
        sum += v;
      }
    });
    dataY.push(sum);
  }
  document.getElementById('yearLabel').textContent = refYear.getFullYear();

  // Render/update weekly chart
  const wCtx = document.getElementById('weeklyChart').getContext('2d');
  if (weeklyChart) {
    weeklyChart.data.labels = labels7;
    weeklyChart.data.datasets[0].data = data7;
    weeklyChart.update();
  } else {
    weeklyChart = new Chart(wCtx, {
      type:'bar',
      data:{ labels:labels7, datasets:[{ label:'Tasks Completed', data:data7, backgroundColor:'orange'}] },
      options:{ responsive:true, scales:{ y:{ beginAtZero:true, precision:0 } } }
    });
  }

  // Monthly chart
  const mCtx = document.getElementById('monthlyChart').getContext('2d');
  if (monthlyChart) {
    monthlyChart.data.labels = labelsM;
    monthlyChart.data.datasets[0].data = dataM;
    monthlyChart.update();
  } else {
    monthlyChart = new Chart(mCtx, {
      type:'bar',
      data:{ labels:labelsM, datasets:[{ label:'Tasks Completed', data:dataM, backgroundColor:'orange'}] },
      options:{ responsive:true, scales:{ y:{ beginAtZero:true, precision:0 } } }
    });
  }

  // Yearly chart
  const yCtx = document.getElementById('yearChart').getContext('2d');
  if (yearChart) {
    yearChart.data.labels = labelsY;
    yearChart.data.datasets[0].data = dataY;
    yearChart.update();
  } else {
    yearChart = new Chart(yCtx, {
      type:'bar',
      data:{ labels:labelsY, datasets:[{ label:'Tasks Completed', data:dataY, backgroundColor:'orange'}] },
      options:{ responsive:true, scales:{ y:{ beginAtZero:true, precision:0 } } }
    });
  }
}

export function toggleAnalytics(show = null) {
  const modal = document.getElementById('analyticsModal'),
        ov    = document.getElementById('analyticsOverlay'),
        isVis = modal.style.display === 'block',
        should= show === null ? !isVis : show;
  if (should) renderAnalytics();
  modal.style.display = should ? 'block' : 'none';
  ov.style.display    = should ? 'block' : 'none';
}
