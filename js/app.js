/**
 * Daily Sanctuary
 * No scenes. Theme + dim controls. Habit stack. Look back.
 */

import * as db from "./db.js";
import { QUOTES, AI_LINKS, DEFAULT_HABITS, THEMES } from "../data/content.js";

const STATE_KEY = "state";

let state = {
  habits: [...DEFAULT_HABITS],
  checked: {},
  reflection: "",
  history: [],
  lastDate: null,
  themeId: "default",
  dim: false
};

let view = "home";
let timerSeconds = 0;
let timerInterval = null;
let timerRunning = false;

const app = document.getElementById("app");

async function load() {
  const saved = await db.get(STATE_KEY);
  if (saved) state = { ...state, ...saved };

  const today = localDate();
  if (state.lastDate !== today) {
    if (state.lastDate && state.reflection.trim()) {
      state.history.unshift({
        date: state.lastDate,
        text: state.reflection.trim()
      });
      if (state.history.length > 90) state.history = state.history.slice(0, 90);
    }
    state.checked = {};
    state.reflection = "";
    state.lastDate = today;
    await save();
  }

  applyTheme();
  render();
}

async function save() {
  await db.set(STATE_KEY, state);
}

function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function dayIndex(len) {
  const d = localDate();
  let hash = 0;
  for (let i = 0; i < d.length; i++) hash = (hash * 31 + d.charCodeAt(i)) >>> 0;
  return hash % len;
}

function applyTheme() {
  const theme = THEMES.find(t => t.id === state.themeId) || THEMES[0];
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--panel", theme.panel);
  document.documentElement.style.setProperty("--accent", theme.accent);
  document.body.classList.toggle("dim", state.dim);
}

function render() {
  if (view === "history") return renderHistory();
  if (view === "edit-habits") return renderEditHabits();
  renderHome();
}

function renderHome() {
  const quote = QUOTES[dayIndex(QUOTES.length)];

  app.innerHTML = `
    <div class="top-bar">
      <h1>Daily Sanctuary</h1>
      <div class="theme-controls">
        <select id="theme-select" aria-label="Color scheme">
          ${THEMES.map(t => `
            <option value="${t.id}" ${state.themeId === t.id ? "selected" : ""}>${escape(t.name)}</option>
          `).join("")}
        </select>
        <button class="dim-btn" id="dim-toggle">${state.dim ? "Undim" : "Dim"}</button>
      </div>
    </div>

    <p class="quote">“${escape(quote.text)}”</p>
    ${quote.author ? `<p class="quote-author">— ${escape(quote.author)}</p>` : `<p class="quote-author"></p>`}

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

    <!-- Habit stack -->
    <div class="section">
      <div class="section-title">
        <span>Habit stack</span>
        <button class="btn btn-ghost" id="edit-habits" style="padding:0.25rem 0.6rem;font-size:0.8rem">Edit</button>
      </div>
      <ul class="habit-list">
        ${state.habits.map((label, i) => `
          <li>
            <input type="checkbox" id="h${i}" ${state.checked[i] ? "checked" : ""} />
            <label class="label ${state.checked[i] ? "done" : ""}" for="h${i}">${escape(label)}</label>
          </li>
        `).join("")}
      </ul>
    </div>

    <!-- Reflection -->
    <div class="section">
      <div class="section-title">
        <span>A few words (only you see this)</span>
        <button class="btn btn-ghost" id="look-back" style="padding:0.25rem 0.6rem;font-size:0.8rem">Look back</button>
      </div>
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

    <div class="footer">
      <p>Private · Local · No account</p>
      <button id="wipe">Wipe all data on this device</button>
    </div>
  `;

  bindHomeEvents();
}

function bindHomeEvents() {
  // Theme
  document.getElementById("theme-select").onchange = async (e) => {
    state.themeId = e.target.value;
    applyTheme();
    await save();
  };

  document.getElementById("dim-toggle").onclick = async () => {
    state.dim = !state.dim;
    applyTheme();
    await save();
    render(); // refresh button label
  };

  // Timer
  document.querySelectorAll("[data-min]").forEach(btn => {
    btn.onclick = () => {
      stopTimer();
      timerSeconds = Number(btn.dataset.min) * 60;
      updateTimerDisplay();
    };
  });
  document.getElementById("timer-toggle").onclick = toggleTimer;

  // Habits
  state.habits.forEach((_, i) => {
    const el = document.getElementById(`h${i}`);
    if (!el) return;
    el.onchange = async () => {
      state.checked[i] = el.checked;
      await save();
      el.nextElementSibling.classList.toggle("done", el.checked);
    };
  });

  document.getElementById("edit-habits").onclick = () => {
    view = "edit-habits";
    render();
  };

  // Reflection
  document.getElementById("save-reflection").onclick = async () => {
    state.reflection = document.getElementById("reflection").value;
    await save();
    const btn = document.getElementById("save-reflection");
    btn.textContent = "Saved";
    setTimeout(() => { if (btn) btn.textContent = "Save"; }, 1200);
  };

  document.getElementById("look-back").onclick = () => {
    view = "history";
    render();
  };

  // AI menu
  const toggle = document.getElementById("ai-toggle");
  const menu = document.getElementById("ai-menu");
  toggle.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  };
  document.addEventListener("click", closeAiMenu);

  // Wipe
  document.getElementById("wipe").onclick = async () => {
    if (!confirm("Erase all habits, reflections, and local data on this device?")) return;
    state = {
      habits: [...DEFAULT_HABITS],
      checked: {},
      reflection: "",
      history: [],
      lastDate: null,
      themeId: "default",
      dim: false
    };
    stopTimer();
    timerSeconds = 0;
    await db.clearAll();
    applyTheme();
    render();
  };
}

function closeAiMenu(e) {
  const toggle = document.getElementById("ai-toggle");
  const menu = document.getElementById("ai-menu");
  if (!toggle || !menu) return;
  if (!toggle.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("open");
  }
}

function renderHistory() {
  const items = state.history.length
    ? state.history.map(h => `
        <li class="history-item">
          <div class="history-date">${formatDisplayDate(h.date)}</div>
          <div class="history-text">${escape(h.text)}</div>
        </li>
      `).join("")
    : `<p class="empty">No past reflections yet. They will appear here after you save words on different days.</p>`;

  app.innerHTML = `
    <div class="screen-header">
      <button class="btn btn-ghost" id="back">← Back</button>
      <h1>Look back</h1>
    </div>
    <div class="section">
      <ul class="history-list">${items}</ul>
    </div>
  `;

  document.getElementById("back").onclick = () => {
    view = "home";
    render();
  };
}

function renderEditHabits() {
  app.innerHTML = `
    <div class="screen-header">
      <button class="btn btn-ghost" id="back">← Back</button>
      <h1>Edit habit stack</h1>
    </div>
    <div class="section">
      <ul class="habit-list" id="edit-list">
        ${state.habits.map((label, i) => `
          <li>
            <span class="label" style="flex:1">${escape(label)}</span>
            <button class="del-btn" data-i="${i}">Remove</button>
          </li>
        `).join("")}
      </ul>
      <div class="habit-actions">
        <input type="text" id="new-habit" placeholder="New habit…" />
        <button class="btn" id="add-habit">Add</button>
      </div>
    </div>
  `;

  document.getElementById("back").onclick = () => {
    view = "home";
    render();
  };

  document.querySelectorAll(".del-btn").forEach(btn => {
    btn.onclick = async () => {
      const i = Number(btn.dataset.i);
      state.habits.splice(i, 1);
      const newChecked = {};
      state.habits.forEach((_, idx) => {
        if (state.checked[idx >= i ? idx + 1 : idx]) newChecked[idx] = true;
      });
      state.checked = newChecked;
      await save();
      renderEditHabits();
    };
  });

  document.getElementById("add-habit").onclick = async () => {
    const input = document.getElementById("new-habit");
    const val = input.value.trim();
    if (!val) return;
    state.habits.push(val);
    await save();
    input.value = "";
    renderEditHabits();
  };
}

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
    const btn = document.getElementById("timer-toggle");
    if (btn) btn.textContent = "Pause";
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

function formatDisplayDate(iso) {
  const [y, m, d] = iso.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function escape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

load();
