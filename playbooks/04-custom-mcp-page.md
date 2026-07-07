# 给页面创建自定义 MCP

## 核心理解

页面是给人看的，MCP 是给 Codex 用的工具接口。

这个训练环境里：

- 页面通过 HTTP API 读取 `virtual-project/data/tasks.json`；
- MCP server 也读写同一个 JSON 文件；
- Codex 调用 MCP tool 后，刷新页面即可看到数据变化。

## 文件位置

```text
virtual-project/public/index.html
virtual-project/server.js
virtual-project/data/tasks.json
mcp-servers/page-control/server.js
.codex/config.toml
```

## MCP 配置方式

项目级配置示例：

```toml
[mcp_servers.training_page]
command = "node"
args = ["C:\\Users\\EDY\\Desktop\\trainingAI\\mcp-servers\\page-control\\server.js"]
cwd = "C:\\Users\\EDY\\Desktop\\trainingAI"
enabled = true
default_tools_approval_mode = "prompt"
```

## 练习重点

- 理解 tool schema。
- 理解 MCP server 如何读写页面数据。
- 理解为什么写入类工具要审批。
- 练习让 Codex 用 MCP 操作页面，而不是直接改 JSON。

