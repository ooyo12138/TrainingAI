# 任务 06：综合挑战

## 目标

把 Worktree、Automation、Subagent、MCP 串起来练一遍。

## 挑战内容

1. 用 Worktree 隔离实现一个新功能：任务支持 `tag` 字段。
2. 用 Subagent 并行审查实现方案。
3. 设计一个 Automation：每日检查 `blocked` 或 `overdue` 的高优先级任务。
4. 通过 MCP 新增一条带 tag 的任务。
5. 运行测试并汇报结果。

## 限制

- 不要使用外部 API。
- 不要引入第三方依赖。
- 不要改动真实系统配置。
- 所有数据都保存在 `virtual-project/data/tasks.json`。

## 验收标准

- Codex 说明 Worktree 为什么适合这次改动。
- Codex 派出至少 3 个 subagent 做并行审查。
- Codex 产出可用于创建 automation 的 prompt。
- MCP 能读写新增 tag 数据。
- `node tests/run-tests.js` 通过。

## 推荐提示词

```text
请根据 tasks/06-integrated-challenge.md 带我完成综合挑战。
先不要修改文件，先给完整计划，并说明每一步对应练的是哪种 Codex 能力。
```

