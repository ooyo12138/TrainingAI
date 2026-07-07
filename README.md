# TrainingAI

这是一个专门用来练习 Codex 深度能力的本地训练环境。

本环境不需要 OpenAI API Key，不使用 image2，不调用任何外部服务。它只依赖本机 Node.js 和文件系统。

## 你要练什么

重点练这四件事：

1. **Worktree**：让 Codex 在隔离工作树里并行做任务，避免影响当前目录。
2. **Automation**：设计可重复执行的后台任务提示词，理解本地项目和 worktree 自动化的区别。
3. **Subagent**：让 Codex 生成多个专门代理并行审查、探索和实现。
4. **自定义 MCP**：给某个本地页面创建一个 MCP server，让 Codex 通过工具读写页面背后的数据。

## 项目内容

```text
trainingAI/
  AGENTS.md                         Codex 总规则
  START_HERE.md                     第一次使用说明
  PROMPTS.md                        常用训练提示词
  .codex/
    config.toml                     项目级配置示例，包含 MCP 配置
    agents/                         自定义 subagent 示例
  automations/                      自动化练习说明和提示词
  mcp-servers/page-control/         自定义 MCP server
  playbooks/                        Worktree / Automation / Subagent / MCP 手册
  tasks/                            训练任务卡
  tools/check.ps1                   一键检查
  virtual-project/                  本地任务看板页面项目
```

## 快速开始

打开 Codex App，把项目目录选择为：

```text
C:\Users\EDY\Desktop\trainingAI
```

然后对 Codex 说：

```text
请先不要改代码。请阅读 START_HERE.md、AGENTS.md、tasks/00-index.md、virtual-project/AGENTS.md 和 mcp-servers/page-control/README.md，然后告诉我这个训练环境怎么用。
```

## 运行本地页面

```powershell
cd C:\Users\EDY\Desktop\trainingAI\virtual-project
node server.js
```

默认页面地址：

```text
http://localhost:4173
```

## 运行测试

```powershell
cd C:\Users\EDY\Desktop\trainingAI\virtual-project
node tests/run-tests.js
```

或从根目录运行：

```powershell
powershell -ExecutionPolicy Bypass -File tools/check.ps1
```

## 自定义 MCP 练习

MCP server 在：

```text
mcp-servers/page-control/server.js
```

它暴露这些工具：

- `page_get_summary`：读取页面当前统计。
- `page_list_tasks`：读取页面任务列表。
- `page_create_task`：向页面数据新增任务。
- `page_update_task_status`：修改任务状态。
- `page_get_widget_map`：返回页面区域和 DOM 选择器说明。

项目配置示例在：

```text
.codex/config.toml
```

你可以让 Codex 帮你检查、启用、测试这个 MCP。

## 官方概念对应

- Worktree：Git worktree，适合隔离并行任务。
- Automation：后台定时或重复运行的 Codex 任务。
- Subagent：显式让 Codex 派多个专门代理并行工作。
- MCP：把模型连接到外部工具和上下文的协议。

