const invoke =
  window.__TAURI__?.core?.invoke ||
  window.__TAURI__?.tauri?.invoke;

console.log("JS LOADED", invoke);

/* =======================
   STATE
======================= */
let currentPage = "home";
let currentEditingGame = null;

/* =======================
   NAVIGATION
======================= */
function setPage(page, el) {
  currentPage = page;

  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item, .brand")
    .forEach(i => i.classList.remove("active"));

  el.classList.add("active");

  log(`Switched: ${page}`);
}

/* =======================
   LIBRARY
======================= */
async function getGames() {
  return await invoke("get_library");
}

/* =======================
   RENDER
======================= */
async function renderGames() {
  const container = document.getElementById("games");
  if (!container) return;

  const games = await getGames();
  container.innerHTML = "";

  games.forEach((g) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = g.id;

    card.innerHTML = `
      <div>
        <div class="game-name">${g.name}</div>
        <div class="game-runner">${g.runner}</div>
        <div class="game-path">${g.path || ""}</div>
      </div>

      <div class="card-actions">
        <button class="card-btn settings-btn">⚙</button>
        <button class="card-btn play-btn">▶</button>
      </div>
    `;

    container.appendChild(card);
  });
}

/* =======================
   CLICK HANDLER (GLOBAL)
======================= */
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");

  /* OPEN SETTINGS */
  if (e.target.classList.contains("settings-btn")) {
    const id = card?.dataset.id;
    if (id) openSettings(id);
  }

  /* PLAY GAME */
  if (e.target.classList.contains("play-btn")) {
    const id = card?.dataset.id;
    if (id) playGame(id);
  }

  /* ADD MODAL */
  if (e.target.id === "openAddGame") openModal();
  if (e.target.id === "closeModal") closeModal();
  if (e.target.id === "addGameBtn") addGame();

  /* SETTINGS MODAL */
  if (e.target.id === "closeSettings") closeSettings();
  if (e.target.id === "saveSettings") saveSettings();
});

document.addEventListener("click", (e) => {

  const pageBtn = e.target.closest("[data-page]");
  if (!pageBtn) return;

  const page = pageBtn.dataset.page;

  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item, .brand")
    .forEach(i => i.classList.remove("active"));

  pageBtn.classList.add("active");

  log(`Switched: ${page}`);
});
/* =======================
   ADD GAME
======================= */
async function addGame() {
  const name = document.getElementById("gameName").value.trim();
  const path = document.getElementById("gamePath").value.trim();
  const runner = document.getElementById("gameRunner").value;

  if (!name) return log("Game name required");

  await invoke("add_game", { name, path, runner });

  closeModal();
  await renderGames();

  log(`Added: ${name}`);
}

/* =======================
   PLAY GAME
======================= */
async function playGame(id) {
  log(`Launching: ${id}`);
  await invoke("launch_game", { id });
}

/* =======================
   SETTINGS
======================= */
async function openSettings(id) {
  const games = await getGames();
  const game = games.find(g => g.id === id);
  if (!game) return;

  currentEditingGame = game;

  document.getElementById("setName").value = game.name;
  document.getElementById("setPath").value = game.path;
  document.getElementById("setRunner").value = game.runner;

  document.getElementById("settingsModal").classList.remove("hidden");
}

function closeSettings() {
  document.getElementById("settingsModal").classList.add("hidden");
  currentEditingGame = null;
}

async function saveSettings() {
  if (!currentEditingGame) return;

  const updated = {
    id: currentEditingGame.id,
    name: document.getElementById("setName").value,
    path: document.getElementById("setPath").value,
    runner: document.getElementById("setRunner").value,
  };

  await invoke("update_game", updated);

  closeSettings();
  await renderGames();

  log("Game updated");
}

/* =======================
   MODAL
======================= */
function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");

  document.getElementById("gameName").value = "";
  document.getElementById("gamePath").value = "";
  document.getElementById("gameRunner").value = "wine";
}

/* =======================
   LOGS
======================= */
function log(msg) {
  const box = document.getElementById("logBox");
  if (!box) return;

  const time = new Date().toLocaleTimeString();
  box.textContent += `[${time}] ${msg}\n`;
  box.scrollTop = box.scrollHeight;
}

/* =======================
   CURSOR
======================= */
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

/* =======================
   INIT
======================= */
async function init() {
  await renderGames();
  log("Ravix initialized");
}

init();

/* =======================
   EXPORT (Tauri / HTML)
======================= */
window.setPage = setPage;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.saveSettings = saveSettings;
window.addGame = addGame;
window.playGame = playGame;
window.renderGames = renderGames;
window.openModal = openModal;
window.closeModal = closeModal;