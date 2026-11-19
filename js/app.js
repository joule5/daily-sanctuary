/**
 * Daily Sanctuary
 * A quiet local place for reflection, small habits, and continuing.
 */

import * as db from "./db.js";
import { SCENES, QUOTES, AI_LINKS, DEFAULT_CHECKBOXES } from "../data/content.js";

const STATE_KEY = "state";

let state = {
  checkboxes: [...DEFAULT_CHECKBOXES],
  checked: {},
  reflection: "",
  lastDate: null
};

let timerSeconds = 0;
let timerInterval = null;
let timerRunning = false;

const app = document.getElementById("app");

// ---------- Boot ----------

async function load() {
  const saved = await db.get(STATE_KEY);
  if (saved) {
    state = { ...state, ...saved };
  }
  // Reset daily checkboxes if the day changed
  const today = localDate();
  if (state.lastDate !== today) {
    state.checked = {};
    state.lastDate = today;
    await save();
  }
  render();
}

async function save() {
  await db.set(STATE_KEY, state);
}

function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

// ---------- Deterministic daily picks ----------

function dayIndex(len) {
  // Stable index based on date so the same day always shows the same scene/quote
  const d = localDate();
  let hash = 0;
  for (let i = 0; i < d.length; i++) hash = (hash * 31 + d.charCodeAt(i)) >>> 0;
  return hash % len;
}

// ---------- Render ----------

function render() {
  const scene = SCENES[dayIndex(SCENES.length)];
  const quote = QUOTES[dayIndex(QUOTES.length)];

  app.innerHTML = `
    <div class="scene" style="background:${scene.gradient}">
      <div class="scene-name">${escape(scene.name)}</div>
      <div class="scene-elements">${escape(scene.elements)}</div>
    </div>

    <div class="content">
      <p class="quote">“${escape(quote.text)}”</p>

      <!-- Meditation -->
      <div class="section">
        <div class="section-title">Meditation</div>
        <div class="timer-display" id="timer">${formatTime(timerSeconds)}</div>
        <div class="timer-controls">
          <button class="btn btn-ghost" data-min="5">5 min</button>
          <button class="btn btn-ghost" data-min="10">10 min</button>
          <button class="btn btn-ghost" data-min="15">15 min</button>
          <button class="btn" id="timer-toggle">${timerRunning ? "Pause" : "Start"}</button>
        </div>
      </div>

      <!-- Self-care -->
      <div class="section">
        <div class="section-title">Today’s small cares</div>
        <ul class="check-list" id="checks">
          ${state.checkboxes.map((label, i) => `
            <li>
              <input type="checkbox" id="c${i}" ${state.checked[i] ? "checked" : ""} />
              <label for="c${i}" class="${state.checked[i] ? "done" : ""}">${escape(label)}</label>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- Reflection -->
      <div class="section">
        <div class="section-title">A few words (only you see this)</div>
        <textarea id="reflection" placeholder="What are you carrying, learning, or noticing…">${escape(state.reflection)}</textarea>
        <div class="btn-row">
          <button class="btn btn-ghost" id="save-reflection">Save</button>
        </div>
      </div>

      <!-- Ask an AI -->
      <div class="section">
        <div class="section-title">Ask an AI</div>
        <div class="ai-dropdown">
          <button class="btn btn-ghost ai-toggle" id="ai-toggle">
            <span>Choose an AI…</span>
            <span>▾</span>
          </button>
          <div class="ai-menu" id="ai-menu">
            ${AI_LINKS.map(ai => `
              <a href="${ai.url}" target="_blank" rel="noopener noreferrer">
                ${escape(ai.name)}
                <span class="note">${escape(ai.note)}</span>
              </a>
            `).join("")}
          </div>
        </div>
        <p class="ai-warning">These links leave this private local space and open another service.</p>
      </div>
    </div>

    <div class="footer">
      <p>Private · Local · No account</p>
      <button id="wipe">Wipe all data on this device</button>
    </div>
  `;

  // Timer buttons
  document.querySelectorAll("[data-min]").forEach(btn => {
    btn.onclick = () => {
      stopTimer();
      timerSeconds = Number(btn.dataset.min) * 60;
      updateTimerDisplay();
    };
  });
  document.getElementById("timer-toggle").onclick = toggleTimer;

  // Checkboxes
  state.checkboxes.forEach((_, i) => {
    const el = document.getElementById(`c${i}`);
    el.onchange = async () => {
      state.checked[i] = el.checked;
      await save();
      // Update label style without full re-render
      el.nextElementSibling.classList.toggle("done", el.checked);
    };
  });

  // Reflection
  document.getElementById("save-reflection").onclick = async () => {
    state.reflection = document.getElementById("reflection").value;
    await save();
    const btn = document.getElementById("save-reflection");
    btn.textContent = "Saved";
    setTimeout(() => { btn.textContent = "Save"; }, 1200);
  };

  // AI dropdown
  const toggle = document.getElementById("ai-toggle");
  const menu = document.getElementById("ai-menu");
  toggle.onclick = () => menu.classList.toggle("open");
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  // Wipe
  document.getElementById("wipe").onclick = async () => {
    if (!confirm("Erase all checkboxes, reflection, and local data on this device?")) return;
    state = { checkboxes: [...DEFAULT_CHECKBOXES], checked: {}, reflection: "", lastDate: null };
    stopTimer();
    timerSeconds = 0;
    await db.clearAll();
    render();
  };
}

// ---------- Timer ----------

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const el = document.getElementById("timer");
  if (el) el.textContent = formatTime(timerSeconds);
}

function toggleTimer() {
  if (timerRunning) {
    stopTimer();
  } else {
    if (timerSeconds <= 0) timerSeconds = 5 * 60;
    timerRunning = true;
    document.getElementById("timer-toggle").textContent = "Pause";
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        stopTimer();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      }
    }, 1000);
  }
}

function stopTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  const btn = document.getElementById("timer-toggle");
  if (btn) btn.textContent = "Start";
}

function escape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- Start ----------
load();
