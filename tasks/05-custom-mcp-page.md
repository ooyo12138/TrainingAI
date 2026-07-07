# 任务 05：给页面创建自定义 MCP

## 目标

练习如何给一个本地页面配套自定义 MCP server。

## 你要理解的关系

```text
页面 index.html
  ↓ 通过 HTTP API 读取
virtual-project/data/tasks.json
  ↑ MCP server 也读写这个文件
Codex 通过 MCP 工具读写页面数据
```

MCP 不等于网页。MCP 是给 Codex 用的工具接口。这个训练环境里，页面和 MCP 共享同一个 JSON 数据文件，所以 Codex 通过 MCP 改数据后，刷新页面就能看到变化。

## 任务内容

让 Codex：

1. 阅读 `mcp-servers/page-control/README.md`；
2. 检查 `mcp-servers/page-control/server.js`；
3. 检查 `.codex/config.toml` 里的 MCP 配置；
4. 解释每个 MCP tool 的作用；
5. 用 MCP 工具新增一条任务；
6. 刷新页面或读取 API 确认数据变化。

## 验收标准

- Codex 能解释 MCP server、页面、数据文件的关系。
- `node mcp-servers/page-control/test-handler.js` 通过。
- Codex 能说明如何在 Codex 设置里启用这个 MCP。
- Codex 能通过 MCP 工具读写页面数据。

## 推荐提示词

```text
我想练给页面创建自定义 MCP。
请根据 tasks/05-custom-mcp-page.md，先解释架构，再检查 MCP 配置。
如果 MCP 工具可用，请用 page_create_task 新增一条训练任务。
```

