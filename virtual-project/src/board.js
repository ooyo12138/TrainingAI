const VALID_STATUSES = new Set(["todo", "in_progress", "blocked", "done"]);
const VALID_PRIORITIES = new Set(["low", "medium", "high"]);

function normalizeTask(input) {
  if (!input || typeof input !== "object") {
    throw new Error("task must be an object");
  }

  const task = {
    id: String(input.id || Date.now()),
    title: String(input.title || "").trim(),
    owner: String(input.owner || "Unassigned").trim(),
    status: String(input.status || "todo"),
    priority: String(input.priority || "medium"),
    dueDate: String(input.dueDate || ""),
    description: String(input.description || "").trim()
  };

  if (!task.title) {
    throw new Error("task title is required");
  }
  if (!VALID_STATUSES.has(task.status)) {
    throw new Error(`invalid status: ${task.status}`);
  }
  if (!VALID_PRIORITIES.has(task.priority)) {
    throw new Error(`invalid priority: ${task.priority}`);
  }

  return task;
}

function filterTasks(tasks, filters = {}) {
  return tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.owner && task.owner.toLowerCase() !== String(filters.owner).toLowerCase()) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });
}

function summarizeTasks(tasks, today = new Date().toISOString().slice(0, 10)) {
  const summary = {
    total: tasks.length,
    todo: 0,
    in_progress: 0,
    blocked: 0,
    done: 0,
    highPriorityOpen: 0,
    overdue: 0
  };

  for (const task of tasks) {
    if (summary[task.status] !== undefined) {
      summary[task.status] += 1;
    }
    if (task.priority === "high" && task.status !== "done") {
      summary.highPriorityOpen += 1;
    }
    if (task.dueDate && task.dueDate < today && task.status !== "done") {
      summary.overdue += 1;
    }
  }

  return summary;
}

function addTask(tasks, input) {
  const task = normalizeTask({
    id: input.id || nextId(tasks),
    ...input
  });
  return [...tasks, task];
}

function updateTaskStatus(tasks, id, status) {
  if (!VALID_STATUSES.has(status)) {
    throw new Error(`invalid status: ${status}`);
  }

  let found = false;
  const updated = tasks.map((task) => {
    if (task.id !== String(id)) return task;
    found = true;
    return { ...task, status };
  });

  if (!found) {
    throw new Error(`task not found: ${id}`);
  }

  return updated;
}

function nextId(tasks) {
  const max = tasks.reduce((largest, task) => {
    const value = Number(task.id);
    return Number.isFinite(value) ? Math.max(largest, value) : largest;
  }, 1000);
  return String(max + 1);
}

function getWidgetMap() {
  return [
    { name: "summary", selector: "[data-widget='summary']", purpose: "Shows total, blocked, overdue, and high-priority counts." },
    { name: "filters", selector: "[data-widget='filters']", purpose: "Filters visible tasks by status." },
    { name: "taskList", selector: "[data-widget='task-list']", purpose: "Renders the visible task cards." },
    { name: "report", selector: "[data-widget='report']", purpose: "Shows the generated daily report." }
  ];
}

module.exports = {
  VALID_PRIORITIES,
  VALID_STATUSES,
  addTask,
  filterTasks,
  getWidgetMap,
  normalizeTask,
  summarizeTasks,
  updateTaskStatus
};

