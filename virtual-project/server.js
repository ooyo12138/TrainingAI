const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const { addTask, filterTasks, summarizeTasks, updateTaskStatus } = require("./src/board");
const { buildDailyReport } = require("./src/report");
const { readTasks, writeTasks } = require("./src/storage");

const PORT = Number(process.env.PORT || 4173);
const PUBLIC_DIR = path.resolve(__dirname, "public");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/tasks" && req.method === "GET") {
      const tasks = filterTasks(readTasks(), {
        status: url.searchParams.get("status"),
        owner: url.searchParams.get("owner"),
        priority: url.searchParams.get("priority")
      });
      return sendJson(res, { code: 0, data: tasks, message: "ok" });
    }

    if (url.pathname === "/api/tasks" && req.method === "POST") {
      const body = await readJson(req);
      const tasks = addTask(readTasks(), body);
      writeTasks(tasks);
      return sendJson(res, { code: 0, data: tasks[tasks.length - 1], message: "created" }, 201);
    }

    if (url.pathname.startsWith("/api/tasks/") && req.method === "PATCH") {
      const id = decodeURIComponent(url.pathname.split("/").pop());
      const body = await readJson(req);
      const tasks = updateTaskStatus(readTasks(), id, body.status);
      writeTasks(tasks);
      return sendJson(res, { code: 0, data: tasks.find((task) => task.id === id), message: "updated" });
    }

    if (url.pathname === "/api/summary" && req.method === "GET") {
      return sendJson(res, { code: 0, data: summarizeTasks(readTasks()), message: "ok" });
    }

    if (url.pathname === "/api/report" && req.method === "GET") {
      return sendJson(res, { code: 0, data: buildDailyReport(readTasks()), message: "ok" });
    }

    return serveStatic(url.pathname, res);
  } catch (error) {
    return sendJson(res, { code: 100, data: null, message: error.message }, 500);
  }
});

function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(PUBLIC_DIR, "." + safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    return sendText(res, "Forbidden", 403);
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return sendText(res, "Not found", 404);
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

function sendJson(res, payload, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}

function sendText(res, text, status = 200) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error("request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Local Task Board running at http://localhost:${PORT}`);
  });
}

module.exports = {
  server
};

