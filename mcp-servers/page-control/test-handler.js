const assert = require("assert");
const { handleRequest, tools } = require("./server");

async function main() {
  const init = await handleRequest({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} });
  assert.equal(init.serverInfo.name, "training-page-control");

  const listed = await handleRequest({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
  assert.equal(listed.tools.length, tools.length);
  assert.ok(listed.tools.some((tool) => tool.name === "page_get_summary"));
  assert.ok(listed.tools.some((tool) => tool.name === "page_create_task"));

  const summary = await handleRequest({
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: { name: "page_get_summary", arguments: {} }
  });
  assert.ok(summary.content[0].text.includes("summary"));

  const widgets = await handleRequest({
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: { name: "page_get_widget_map", arguments: {} }
  });
  assert.ok(widgets.content[0].text.includes("taskList"));

  console.log("MCP handler smoke test passed.");
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});

