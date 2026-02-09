// -----------------------------
// TaskManager Demo Frontend
// -----------------------------
// Stores JWT in localStorage and calls the API with fetch.
//
// Endpoints used:
// - POST /api/auth/register
// - POST /api/auth/login
// - GET  /api/tasks?page=&pageSize=&isCompleted=
// - POST /api/tasks
//
// NOTE: This is intentionally simple and readable for interviews.

const els = {
  // auth inputs
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  registerBtn: document.getElementById("registerBtn"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  authMsg: document.getElementById("authMsg"),
  authChip: document.getElementById("authChip"),
  tokenPreview: document.getElementById("tokenPreview"),

  // task inputs
  taskTitle: document.getElementById("taskTitle"),
  taskDesc: document.getElementById("taskDesc"),
  createTaskBtn: document.getElementById("createTaskBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  taskMsg: document.getElementById("taskMsg"),
  taskList: document.getElementById("taskList"),

  // paging/filter
  page: document.getElementById("page"),
  pageSize: document.getElementById("pageSize"),
  completedFilter: document.getElementById("completedFilter"),
  pageMeta: document.getElementById("pageMeta"),
};

// ---- Token helpers ----
const TOKEN_KEY = "tm_token";
const USERNAME_KEY = "tm_username";

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

// ---- UI helpers ----
function showMsg(el, text, kind = "info") {
  el.className = `msg ${kind}`;
  el.textContent = text || "";
}

function setAuthUI(isAuthed) {
  const username = localStorage.getItem(USERNAME_KEY);

  els.logoutBtn.disabled = !isAuthed;
  els.createTaskBtn.disabled = !isAuthed;
  els.refreshBtn.disabled = !isAuthed;

  els.authChip.textContent = isAuthed ? `Signed in as ${username}` : "Not signed in";
  els.authChip.className = isAuthed ? "chip ok" : "chip";

  const token = getToken();
  els.tokenPreview.textContent = token ? token : "(none)";

  if (!isAuthed) {
    els.taskList.innerHTML = "";
    els.pageMeta.textContent = "";
  }
}

function renderTasks(paged) {
  const items = paged.items ?? [];
  const totalItems = paged.totalItems ?? 0;
  const totalPages = paged.totalPages ?? 0;
  const page = paged.page ?? 1;
  const pageSize = paged.pageSize ?? items.length;

  els.pageMeta.textContent = `Total: ${totalItems} • Page ${page}/${totalPages || 1} • PageSize ${pageSize}`;

  if (items.length === 0) {
    els.taskList.innerHTML = `<div class="empty">No tasks found.</div>`;
    return;
  }

  els.taskList.innerHTML = items
    .map(
      (t) => `
      <div class="task" data-task-id="${t.id}">
        <div class="taskTop">
          <div class="taskTitle">${escapeHtml(t.title)}</div>
          <div class="badge ${t.isCompleted ? "done" : "todo"}">
            ${t.isCompleted ? "Completed" : "Pending"}
          </div>
        </div>

        <div class="taskDesc">${escapeHtml(t.description ?? "")}</div>

        <div class="taskBottom">
          <div class="taskMeta">Task ID: ${t.id}</div>
          <div class="taskActions">
            <button class="btn small" data-action="toggle">
              ${t.isCompleted ? "Mark Pending" : "Mark Completed"}
            </button>
            <button class="btn small danger" data-action="delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---- HTTP helper ----
async function apiFetch(path, options = {}) {
  const headers = options.headers ? { ...options.headers } : {};

  // If we have a token, attach it
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Default accept JSON
  headers["Accept"] = "application/json";

  return fetch(path, { ...options, headers });
}

// ---- Auth actions ----
async function register() {
  showMsg(els.authMsg, "");
  const username = els.username.value.trim();
  const password = els.password.value;

  if (!username || !password) {
    showMsg(els.authMsg, "Username and password are required.", "warn");
    return;
  }

  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    showMsg(els.authMsg, "Registered successfully. Now login.", "ok");
    return;
  }

  const text = await res.text();
  showMsg(els.authMsg, `Register failed: ${res.status} ${text}`, "err");
}

async function login() {
  showMsg(els.authMsg, "");
  const username = els.username.value.trim();
  const password = els.password.value;

  if (!username || !password) {
    showMsg(els.authMsg, "Username and password are required.", "warn");
    return;
  }

  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    showMsg(els.authMsg, `Login failed: ${res.status} ${text}`, "err");
    return;
  }

  // Login returns JSON: { token: "..." }
  const data = await res.json();
  if (!data.token) {
    showMsg(els.authMsg, "Login succeeded but token missing in response.", "err");
    return;
  }

  setToken(data.token, username);
  setAuthUI(true);
  showMsg(els.authMsg, "Login successful.", "ok");

  // Load tasks immediately
  await loadTasks();
}

function logout() {
  clearToken();
  setAuthUI(false);
  showMsg(els.authMsg, "Logged out.", "info");
  showMsg(els.taskMsg, "");
}

// ---- Task actions ----
async function createTask() {
  showMsg(els.taskMsg, "");
  const title = els.taskTitle.value.trim();
  const description = els.taskDesc.value.trim() || null;

  if (!title) {
    showMsg(els.taskMsg, "Title is required.", "warn");
    return;
  }

  const res = await apiFetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    const text = await res.text();
    showMsg(els.taskMsg, `Create failed: ${res.status} ${text}`, "err");
    return;
  }

  els.taskTitle.value = "";
  els.taskDesc.value = "";

  showMsg(els.taskMsg, "Task created.", "ok");
  await loadTasks();
}

function buildTasksQuery() {
  const page = Number(els.page.value || 1);
  const pageSize = Number(els.pageSize.value || 5);
  const isCompleted = els.completedFilter.value; // "", "true", "false"

  const params = new URLSearchParams();
  params.set("page", String(Math.max(1, page)));
  params.set("pageSize", String(Math.min(100, Math.max(1, pageSize))));

  if (isCompleted === "true" || isCompleted === "false") {
    params.set("isCompleted", isCompleted);
  }

  return `/api/tasks?${params.toString()}`;
}

async function loadTasks() {
  showMsg(els.taskMsg, "");
  const url = buildTasksQuery();

  const res = await apiFetch(url, { method: "GET" });

  if (res.status === 401) {
    showMsg(els.taskMsg, "Unauthorized. Please login again.", "warn");
    logout();
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    showMsg(els.taskMsg, `Load failed: ${res.status} ${text}`, "err");
    return;
  }

  const data = await res.json();
  renderTasks(data);
}

async function toggleTask(taskId) {
  // Find the task in the current rendered list by reading DOM text,
  // then re-fetch current page to keep the UI consistent.
  // We’ll do a simple approach: fetch the task list and locate the task.
  const url = buildTasksQuery();
  const res = await apiFetch(url, { method: "GET" });

  if (!res.ok) {
    const text = await res.text();
    showMsg(els.taskMsg, `Unable to load tasks: ${res.status} ${text}`, "err");
    return;
  }

  const data = await res.json();
  const task = (data.items ?? []).find((x) => x.id === taskId);

  if (!task) {
    showMsg(els.taskMsg, "Task not found on this page. Try Refresh.", "warn");
    return;
  }

  const updated = {
    title: task.title,
    description: task.description,
    isCompleted: !task.isCompleted,
  };

  const putRes = await apiFetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    showMsg(els.taskMsg, `Update failed: ${putRes.status} ${text}`, "err");
    return;
  }

  showMsg(els.taskMsg, "Task updated.", "ok");
  await loadTasks();
}

async function deleteTask(taskId) {
  const ok = confirm("Delete this task? This cannot be undone.");
  if (!ok) return;

  const res = await apiFetch(`/api/tasks/${taskId}`, { method: "DELETE" });

  if (!res.ok) {
    const text = await res.text();
    showMsg(els.taskMsg, `Delete failed: ${res.status} ${text}`, "err");
    return;
  }

  showMsg(els.taskMsg, "Task deleted.", "ok");
  await loadTasks();
}

els.taskList.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const taskEl = e.target.closest(".task");
  if (!taskEl) return;

  const taskId = Number(taskEl.dataset.taskId);
  const action = btn.dataset.action;

  if (!taskId) return;

  if (action === "toggle") {
    await toggleTask(taskId);
  } else if (action === "delete") {
    await deleteTask(taskId);
  }
});


// ---- Wire up events ----
els.registerBtn.addEventListener("click", register);
els.loginBtn.addEventListener("click", login);
els.logoutBtn.addEventListener("click", logout);

els.createTaskBtn.addEventListener("click", createTask);
els.refreshBtn.addEventListener("click", loadTasks);

els.page.addEventListener("change", loadTasks);
els.pageSize.addEventListener("change", loadTasks);
els.completedFilter.addEventListener("change", loadTasks);

// ---- Init ----
(function init() {
  const token = getToken();
  setAuthUI(!!token);
  showMsg(els.authMsg, token ? "Loaded existing session." : "");
  if (token) {
    loadTasks();
  }
})();
