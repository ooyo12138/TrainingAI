# AGENTS.md

本目录是 Codex 高级能力训练环境，不是生产项目。

## 用户训练目标

用户重点练习：

- Worktree
- Automation
- Subagent
- 给某个本地页面创建和使用自定义 MCP

## 工作规则

- 默认使用中文回答。
- 修改前先读相关任务卡。
- 进入 `virtual-project/` 前必须阅读 `virtual-project/AGENTS.md`。
- 进入 `mcp-servers/page-control/` 前必须阅读 `mcp-servers/page-control/README.md`。
- 不要引入外部 API、OpenAI API Key、image2、云服务依赖。
- 优先使用 Node.js 标准库。
- 每次改动后运行：

```powershell
cd C:\Users\EDY\Desktop\trainingAI\virtual-project
node tests/run-tests.js
```

## 汇报格式

完成任务后按这个格式汇报：

```text
改动摘要：
- ...

验证：
- ...

你这次练到的 Codex 能力：
- ...

风险/后续：
- ...
```

## 安全边界

- 不要读取真实账号、真实密钥、浏览器 cookie。
- 不要把真实 API Key 写进配置。
- MCP server 只允许读写本训练环境下的 `virtual-project/data/tasks.json`。

