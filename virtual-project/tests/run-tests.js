const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { addTask, filterTasks, getWidgetMap, summarizeTasks, updateTaskStatus } = require("../src/board");
const { buildDailyReport } = require("../src/report");
const { readTasks, writeTasks } = require("../src/storage");

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

const fixture = [
  { id: "1", title: "A", owner: "Ava", status: "todo", priority: "high", dueDate: "2026-07-01", description: "First" },
  { id: "2", title: "B", owner: "Ben", status: "blocked", priority: "high", dueDate: "2026-07-08", description: "Second" },
  { id: "3", title: "C", owner: "Ava", status: "done", priority: "low", dueDate: "2026-07-01", description: "Third" }
];

test("summarizeTasks counts task states and risks", () => {
  const summary = summarizeTasks(fixture, "2026-07-07");
  assert.equal(summary.total, 3);
  assert.equal(summary.todo, 1);
  assert.equal(summary.blocked, 1);
  assert.equal(summary.done, 1);
  assert.equal(summary.highPriorityOpen, 2);
  assert.equal(summary.overdue, 1);
});

test("filterTasks filters by status, owner, and priority", () => {
  assert.equal(filterTasks(fixture, { status: "blocked" }).length, 1);
  assert.equal(filterTasks(fixture, { owner: "ava" }).length, 2);
  assert.equal(filterTasks(fixture, { priority: "high" }).length, 2);
});

test("addTask creates string ids and validates title", () => {
  const next = addTask(fixture, { title: "D", owner: "Dana", priority: "medium" });
  assert.equal(next.length, 4);
  assert.equal(typeof next[3].id, "string");
  assert.equal(next[3].status, "todo");
  assert.throws(() => addTask(fixture, { title: "" }), /title is required/);
});

test("updateTaskStatus updates a known task", () => {
  const next = updateTaskStatus(fixture, "1", "done");
  assert.equal(next.find((task) => task.id === "1").status, "done");
  assert.throws(() => updateTaskStatus(fixture, "missing", "done"), /task not found/);
});

test("buildDailyReport groups findings", () => {
  const report = buildDailyReport(fixture, "2026-07-07");
  assert.equal(report.findings.blocked.length, 1);
  assert.equal(report.findings.overdue.length, 1);
  assert.equal(report.recommendation, "Resolve blocked tasks before starting new work.");
});

test("getWidgetMap documents page widgets", () => {
  const widgets = getWidgetMap();
  assert.ok(widgets.some((widget) => widget.name === "summary"));
  assert.ok(widgets.some((widget) => widget.selector.includes("task-list")));
});

test("storage reads and writes JSON arrays", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "training-ai-"));
  const file = path.join(tempDir, "tasks.json");
  writeTasks(fixture, file);
  assert.deepEqual(readTasks(file), fixture);
});

if (!process.exitCode) {
  console.log("All virtual-project tests passed.");
}

