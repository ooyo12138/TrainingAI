const fs = require("fs");
const path = require("path");

const {
  addTask,
  filterTasks,
  getWidgetMap,
  summarizeTasks,
  updateTaskStatus
} = require("../../virtual-project/src/board");
const { buildDailyReport } = require("../../virtual-project/src/report");
const { readTasks, writeTasks } = require("../../virtual-project/src/storage");

const DATA_PATH = path.resolve(__dirname, "../../virtual-project/data/tasks.json");

const tools = [
  {
    name: "page_get_summary",
    description: "Read the current Local Task Board summary from the shared JSON data file.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: "page_list_tasks",
    description: "List tasks shown by the Local Task Board. Supports optional status, owner, and priority filters.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["todo", "in_progress", "blocked", "done"] },
        owner: { type: "string" },
        priority: { type: "string", enum: ["low", "medium", "high"] }
      },
      additionalProperties: false
    }
  },
  {
    name: "page_create_task",
    description: "Create a new task in the Local Task Board shared data file.",
    inputSchema: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        owner: { type: "string" },
        status: { type: "string", enum: ["todo", "in_progress", "blocked", "done"] },
        priority: { type: "string", enum: ["low", "medium", "high"] },
        dueDate: { type: "string", description: "YYYY-MM-DD date string." },
        description: { type: "string" }
      },
      additionalProperties: false
    }
  },
  {
    name: "page_update_task_status",
    description: "Update a task status in the Local Task Board shared data file.",
    inputSchema: {
      type: "object",
      required: ["id", "status"],
      properties: {
        id: { type: "string" },
        status: { type: "string", enum: ["todo", "in_progress", "blocked", "done"] }
      },
      additionalProperties: false
    }
  },
  {
    name: "page_get_widget_map",
    description: "Return the page widgets, DOM selectors, and their purposes for the Local Task Board.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false
    }
  }
];

async function handleRequest(message) {
  if (message.method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: {
        name: "training-page-control",
        version: "1.0.0"
      },
      instructions: "Use these tools to inspect and update only the Local Task Board training page data under virtual-project/data/tasks.json. Ask before write operations when approval is available."
    };
  }

  if (message.method === "tools/list") {
    return { tools };
  }

  if (message.method === "tools/call") {
    const name = message.params && message.params.name;
    const args = (message.params && message.params.arguments) || {};
    return callTool(name, args);
  }

  if (message.method === "notifications/initialized") {
    return undefined;
  }

  throw new Error(`Unsupported method: ${message.method}`);
}

function callTool(name, args) {
  const tasks = readTasks(DATA_PATH);

  if (name === "page_get_summary") {
    return textResult({ summary: summarizeTasks(tasks), report: buildDailyReport(tasks) });
  }

  if (name === "page_list_tasks") {
    return textResult({ tasks: filterTasks(tasks, args) });
  }

  if (name === "page_create_task") {
    const next = addTask(tasks, args);
    writeTasks(next, DATA_PATH);
    return textResult({ created: next[next.length - 1], total: next.length });
  }

  if (name === "page_update_task_status") {
    const next = updateTaskStatus(tasks, args.id, args.status);
    writeTasks(next, DATA_PATH);
    return textResult({ updated: next.find((task) => task.id === String(args.id)) });
  }

  if (name === "page_get_widget_map") {
    return textResult({ widgets: getWidgetMap() });
  }

  throw new Error(`Unknown tool: ${name}`);
}

function textResult(value) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(value, null, 2)
      }
    ]
  };
}

function startStdioServer() {
  let buffer = Buffer.alloc(0);

  process.stdin.on("data", async (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    let frame;
    while ((frame = readFrame(buffer))) {
      buffer = buffer.slice(frame.bytesRead);
      await respond(frame.message);
    }
  });
}

async function respond(message) {
  if (!message || message.id === undefined) {
    return;
  }

  try {
    const result = await handleRequest(message);
    if (result === undefined) return;
    writeFrame({ jsonrpc: "2.0", id: message.id, result });
  } catch (error) {
    writeFrame({
      jsonrpc: "2.0",
      id: message.id,
      error: {
        code: -32000,
        message: error.message
      }
    });
  }
}

function readFrame(buffer) {
  const headerEnd = buffer.indexOf("\r\n\r\n");
  if (headerEnd === -1) return null;

  const header = buffer.slice(0, headerEnd).toString("utf8");
  const match = header.match(/Content-Length: (\d+)/i);
  if (!match) {
    throw new Error("Missing Content-Length header");
  }

  const contentLength = Number(match[1]);
  const bodyStart = headerEnd + 4;
  const bodyEnd = bodyStart + contentLength;
  if (buffer.length < bodyEnd) return null;

  const body = buffer.slice(bodyStart, bodyEnd).toString("utf8");
  return {
    bytesRead: bodyEnd,
    message: JSON.parse(body)
  };
}

function writeFrame(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`);
}

if (require.main === module) {
  startStdioServer();
}

module.exports = {
  DATA_PATH,
  callTool,
  handleRequest,
  readFrame,
  tools
};

