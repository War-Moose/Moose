// ——— BROWN NOISE ———
const audioCtx = new (window.AudioContext||window.webkitAudioContext)();
let noiseSource;
export function startBrownNoise() {
  const bufSize = 4096;
  noiseSource = audioCtx.createScriptProcessor(bufSize, 1, 1);
  let lastOut = 0;
  noiseSource.onaudioprocess = e => {
    const out = e.outputBuffer.getChannelData(0);
    for (let i=0; i<bufSize; i++) {
      const white = Math.random()*2 - 1;
      lastOut = (lastOut + 0.02*white)/1.02;
      out[i] = lastOut * 3.5;
    }
  };
  noiseSource.connect(audioCtx.destination);
}
export function stopAllNoise() {
  if (noiseSource) {
    noiseSource.disconnect();
    if (noiseSource.stop) noiseSource.stop();
    noiseSource = null;
  }
}
export function playTone(duration = 0.2) {
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 440;
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// ——— POMODORO ———
let pomInterval = null,
    pomPhase    = 'work',
    pomTime     = 25 * 60,
    pomRunning  = false;

export function updatePomTimerDisplay() {
  const m = String(Math.floor(pomTime/60)).padStart(2,'0');
  const s = String(pomTime%60).padStart(2,'0');
  document.getElementById('pomTimerDisplay').textContent = `${m}:${s}`;
}

export function updateProgressRing() {
  const total = (pomPhase === 'work'?25*60:5*60);
  const pct   = ((total - pomTime)/total)*100;
  document.getElementById('pomProgressContainer').style.background =
    `conic-gradient(orange ${pct}%, black ${pct}% 100%)`;
}

export function tickPom() {
  pomTime--;
  updatePomTimerDisplay();
  updateProgressRing();
  if (pomTime <= 0) {
    clearInterval(pomInterval);
    if (pomPhase === 'work') {
      stopAllNoise();
      playTone(0.5);
      startBreakPhase();
    } else {
      playTone(0.5);
      pomRunning = false;
      document.getElementById('pomStartBtn').textContent = 'Start Pomodoro';
    }
  }
}

export function startWorkPhase() {
  pomPhase = 'work';
  pomTime  = 25 * 60;
  updatePomTimerDisplay();
  updateProgressRing();
  playTone(0.2);
  startBrownNoise();
  pomInterval = setInterval(tickPom, 1000);
}

export function startBreakPhase() {
  pomPhase = 'break';
  pomTime  = 5 * 60;
  updatePomTimerDisplay();
  updateProgressRing();
  playTone(0.2);
  pomInterval = setInterval(tickPom, 1000);
}

export function togglePomodoro(show = null) {
  const modal = document.getElementById('pomodoroModal'),
        ov    = document.getElementById('pomodoroOverlay'),
        isVis = modal.style.display === 'block',
        should= show === null ? !isVis : show;
  modal.style.display = should ? 'block' : 'none';
  ov.style.display    = should ? 'block' : 'none';
  if (!should && pomRunning) {
    clearInterval(pomInterval);
    stopAllNoise();
    pomRunning = false;
    document.getElementById('pomStartBtn').textContent = 'Start Pomodoro';
    pomPhase = 'work';
    pomTime  = 25 * 60;
    updatePomTimerDisplay();
    updateProgressRing();
  }
}
