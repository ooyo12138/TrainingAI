# virtual-project/AGENTS.md

本目录是普通本地练习项目。

## 技术约束

- 使用 Node.js 标准库。
- 不引入第三方依赖。
- 不调用外部 API。
- 数据保存在 `data/tasks.json`。
- 所有 id 使用 string。

## 修改要求

- 改服务端 API 时同步更新测试。
- 改页面交互时保持页面简单清晰。
- 改数据结构时同步更新：
  - `data/tasks.json`
  - `src/board.js`
  - `src/report.js`
  - `tests/run-tests.js`
  - `mcp-servers/page-control/server.js` 如果 MCP tool 涉及该字段

## 验证命令

```powershell
node tests/run-tests.js
```

