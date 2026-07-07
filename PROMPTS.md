# PROMPTS

## 读训练环境

```text
请先不要修改文件。
请阅读 README.md、AGENTS.md、START_HERE.md、tasks/00-index.md。
然后告诉我：这个训练环境能练什么、怎么练、从哪里开始。
```

## Worktree 练习

```text
我想练 Worktree。
请阅读 tasks/02-worktree-lab.md。
先解释 Worktree 为什么适合这个任务，然后告诉我应该如何在 Codex App 里开启 Worktree 线程。
等我确认后，再在 Worktree 里实现任务。
```

## Automation 练习

```text
我想练 Automation。
请阅读 tasks/03-automation-lab.md 和 automations/examples.md。
先帮我把自动化任务提示词写好，并说明适合 thread automation 还是 standalone/project automation。
不要真的创建自动化，先让我确认。
```

## Subagent 练习

```text
我想练 Subagent。
请阅读 tasks/04-subagent-lab.md。
请显式 spawn 多个 agents：
1. 一个检查代码质量；
2. 一个检查测试缺口；
3. 一个检查 MCP 设计；
4. 一个检查页面交互。
等所有 agent 返回后，汇总结果并给出下一步建议。
```

## 自定义 MCP 练习

```text
我想练给页面创建自定义 MCP。
请阅读 tasks/05-custom-mcp-page.md 和 mcp-servers/page-control/README.md。
先解释 MCP server、页面、数据文件三者关系。
然后帮我检查 .codex/config.toml 是否能连接这个 MCP。
```

## 综合挑战

```text
请根据 tasks/06-integrated-challenge.md 带我完成综合练习。
要求用 Worktree 隔离改动，用 Subagent 做并行审查，设计一个 Automation 提示词，并通过 MCP 修改页面数据。
```

