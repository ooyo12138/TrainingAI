# START HERE

这个训练环境是给你练习 Codex 高级工作流的。

## 第一次对 Codex 说什么

```text
请先不要修改文件。
请阅读 README.md、AGENTS.md、tasks/00-index.md、virtual-project/AGENTS.md、mcp-servers/page-control/README.md。
读完后用白话告诉我：
1. 我能在这里练哪些 Codex 能力？
2. Worktree、Automation、Subagent、MCP 分别在哪些文件里练？
3. 第一个练习应该做什么？
4. 哪些命令可以验证环境？
```

## 推荐练习路线

1. `tasks/01-local-page-baseline.md`：先跑页面和测试。
2. `tasks/02-worktree-lab.md`：用 Worktree 做隔离功能改动。
3. `tasks/03-automation-lab.md`：设计一个后台自动巡检任务。
4. `tasks/04-subagent-lab.md`：让多个 subagent 并行审查项目。
5. `tasks/05-custom-mcp-page.md`：启用并使用本地页面 MCP。
6. `tasks/06-integrated-challenge.md`：把四种能力串起来。

## 你要记住的工作方式

- 不确定时先让 Codex 读文件和计划。
- Worktree 用来隔离变化。
- Automation 要先手动测试提示词，再安排定时。
- Subagent 要显式要求 Codex 派代理。
- MCP 是给 Codex 的工具接口，不是页面本身。

