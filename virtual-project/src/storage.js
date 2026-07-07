const fs = require("fs");
const path = require("path");

const DEFAULT_DATA_PATH = path.resolve(__dirname, "../data/tasks.json");

function readTasks(filePath = DEFAULT_DATA_PATH) {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error("tasks.json must contain an array");
  }
  return data;
}

function writeTasks(tasks, filePath = DEFAULT_DATA_PATH) {
  if (!Array.isArray(tasks)) {
    throw new Error("tasks must be an array");
  }
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2) + "\n", "utf8");
}

module.exports = {
  DEFAULT_DATA_PATH,
  readTasks,
  writeTasks
};

