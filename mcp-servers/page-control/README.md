# Page Control MCP

这是一个给本地任务看板页面使用的自定义 MCP server。

它不调用外部服务，不需要 API Key，不需要第三方依赖。

## 它控制哪个页面

页面项目：

```text
virtual-project/
```

页面地址：

```text
http://localhost:4173
```

共享数据文件：

```text
virtual-project/data/tasks.json
```

## MCP tools

- `page_get_summary`：读取任务统计。
- `page_list_tasks`：列出任务，可按 status、owner、priority 过滤。
- `page_create_task`：新增任务。
- `page_update_task_status`：修改任务状态。
- `page_get_widget_map`：说明页面上的区域和选择器。

## 配置示例

见：

```text
C:\Users\EDY\Desktop\trainingAI\.codex\config.toml
```

核心配置：

```toml
[mcp_servers.training_page]
command = "node"
args = ["C:\\Users\\EDY\\Desktop\\trainingAI\\mcp-servers\\page-control\\server.js"]
cwd = "C:\\Users\\EDY\\Desktop\\trainingAI"
enabled = true
default_tools_approval_mode = "prompt"
```

## 本地测试

```powershell
node test-handler.js
```

## 练习提示

你可以让 Codex：

```text
请使用 training_page MCP 的 page_list_tasks 工具列出 blocked 任务。
```

或：

```text
请使用 training_page MCP 的 page_create_task 工具新增一条 high priority 的练习任务。
```

