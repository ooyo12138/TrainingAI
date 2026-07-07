# 任务 02：Worktree 练习

## 目标

练习在 Codex App 里用 Worktree 隔离改动。

## 任务内容

在任务看板里新增一个筛选能力：

- 页面增加一个 Priority 过滤器；
- API 支持按 `priority` 查询任务；
- 测试覆盖 priority 过滤。

## 为什么适合 Worktree

这是一个独立功能，改动会涉及页面、服务端和测试。用 Worktree 可以把这次实验隔离在后台，不影响你当前 Local 项目。

## 操作建议

1. 在 Codex App 新建线程时选择 **Worktree**。
2. 让 Codex 先读 `virtual-project/`。
3. 让 Codex 制定计划。
4. 确认后实现。
5. 在 worktree 里运行测试。
6. 完成后通过 Codex App 的 diff 面板检查。
7. 如果满意，再选择 Handoff 或创建分支。

## 验收标准

- 页面能按 priority 筛选。
- `/api/tasks?priority=high` 返回 high 任务。
- `node tests/run-tests.js` 通过。
- Codex 能解释 Local 和 Worktree 的区别。

## 推荐提示词

```text
我想练 Worktree。
请根据 tasks/02-worktree-lab.md，在 Worktree 线程里实现 priority 筛选。
先给计划，确认后再改。
```

