const summaryEl = document.querySelector("[data-widget='summary']");
const taskListEl = document.querySelector("[data-widget='task-list']");
const reportEl = document.querySelector("#reportOutput");
const statusFilterEl = document.querySelector("#statusFilter");
const refreshButton = document.querySelector("#refreshButton");

statusFilterEl.addEventListener("change", loadPage);
refreshButton.addEventListener("click", loadPage);

loadPage();

async function loadPage() {
  const status = statusFilterEl.value;
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const [summary, tasks, report] = await Promise.all([
    getJson("/api/summary"),
    getJson(`/api/tasks${query}`),
    getJson("/api/report")
  ]);

  renderSummary(summary.data);
  renderTasks(tasks.data);
  reportEl.textContent = JSON.stringify(report.data, null, 2);
}

async function getJson(url) {
  const response = await fetch(url);
  const payload = await response.json();
  if (payload.code !== 0) {
    throw new Error(payload.message || "request failed");
  }
  return payload;
}

function renderSummary(summary) {
  summaryEl.innerHTML = [
    metric("Total", summary.total),
    metric("Blocked", summary.blocked),
    metric("Overdue", summary.overdue),
    metric("High Priority", summary.highPriorityOpen)
  ].join("");
}

function metric(label, value) {
  return `<article class="metric"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
}

function renderTasks(tasks) {
  if (!tasks.length) {
    taskListEl.innerHTML = `<article class="task-card"><h2>没有匹配任务</h2><p>调整筛选条件或通过 MCP 新增任务。</p></article>`;
    return;
  }

  taskListEl.innerHTML = tasks.map((task) => `
    <article class="task-card">
      <h2>${escapeHtml(task.title)}</h2>
      <p>${escapeHtml(task.description)}</p>
      <div class="task-meta">
        <span class="pill ${escapeHtml(task.status)}">${escapeHtml(task.status)}</span>
        <span class="pill ${escapeHtml(task.priority)}">${escapeHtml(task.priority)}</span>
        <span class="pill">${escapeHtml(task.owner)}</span>
        <span class="pill">${escapeHtml(task.dueDate)}</span>
      </div>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

