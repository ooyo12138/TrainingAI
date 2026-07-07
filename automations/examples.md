# Automation 示例

## 示例 1：每日任务巡检

类型：Project automation

频率：每天上午 9 点

Prompt：

```text
请检查当前项目的 virtual-project/data/tasks.json。
每次运行请：
1. 找出 status=blocked 的任务；
2. 找出 dueDate 早于今天且 status 不是 done 的任务；
3. 找出 priority=high 且未完成的任务；
4. 生成一份简短报告。

如果没有任何发现，请回复“没有需要处理的问题，可以归档本次运行”。
如果有发现，请按 blocked、overdue、high priority 三组列出，并给出建议下一步。

不要修改文件。
```

## 示例 2：每周 MCP 健康检查

类型：Project automation

频率：每周一

Prompt：

```text
请检查 mcp-servers/page-control/server.js 和 .codex/config.toml。
确认：
1. MCP server 能列出 tools；
2. tool schema 与 README 描述一致；
3. 写入工具仍然只写 virtual-project/data/tasks.json；
4. node mcp-servers/page-control/test-handler.js 能通过。

如果发现问题，请报告文件和建议修复方式。未经确认不要改文件。
```

