# 任务 04：Subagent 练习

## 目标

练习显式要求 Codex 派多个 subagent 并行工作。

## 任务内容

让 Codex 派 4 个 subagent：

1. `code-reviewer`：检查代码质量和逻辑 bug。
2. `test-reviewer`：检查测试缺口。
3. `mcp-reviewer`：检查 MCP server 设计。
4. `ux-reviewer`：检查页面交互和可用性。

## 验收标准

Codex 应该：

- 明确说明已派出哪些 agent；
- 等所有 agent 返回；
- 汇总每个 agent 的发现；
- 给出优先级排序；
- 不直接修改代码，除非你确认。

## 推荐提示词

```text
我想练 Subagent。
请根据 tasks/04-subagent-lab.md，显式 spawn 4 个 agents 并行审查当前项目。
先只汇总结果，不要改代码。
```

