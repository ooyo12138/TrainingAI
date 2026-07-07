const { summarizeTasks } = require("./board");

function buildDailyReport(tasks, today = new Date().toISOString().slice(0, 10)) {
  const summary = summarizeTasks(tasks, today);
  const blocked = tasks.filter((task) => task.status === "blocked");
  const overdue = tasks.filter((task) => task.dueDate && task.dueDate < today && task.status !== "done");
  const highPriorityOpen = tasks.filter((task) => task.priority === "high" && task.status !== "done");

  return {
    date: today,
    summary,
    findings: {
      blocked: blocked.map(toFinding),
      overdue: overdue.map(toFinding),
      highPriorityOpen: highPriorityOpen.map(toFinding)
    },
    recommendation: buildRecommendation(summary)
  };
}

function toFinding(task) {
  return {
    id: task.id,
    title: task.title,
    owner: task.owner,
    priority: task.priority,
    dueDate: task.dueDate
  };
}

function buildRecommendation(summary) {
  if (summary.blocked > 0) {
    return "Resolve blocked tasks before starting new work.";
  }
  if (summary.overdue > 0) {
    return "Review overdue tasks and update owners or due dates.";
  }
  if (summary.highPriorityOpen > 0) {
    return "Focus on high-priority open work first.";
  }
  return "No urgent action needed.";
}

module.exports = {
  buildDailyReport
};

