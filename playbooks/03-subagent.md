# Subagent 练习手册

## Subagent 是什么

Subagent 是 Codex 派出的专门代理。它们可以并行读项目、审查问题、比较方案，然后把结果汇总回来。

## 什么时候用

- 大范围 code review。
- 多角度审查同一个功能。
- 一个任务可以拆成互不阻塞的多个方向。
- 你希望减少主线程上下文污染。

## 训练方式

明确要求 Codex spawn agents：

```text
请 spawn 4 个 agents：
1. 检查代码质量；
2. 检查测试缺口；
3. 检查 MCP 设计；
4. 检查页面交互。
等全部返回后汇总，不要直接改代码。
```

## 注意

- Subagent 会消耗更多 token。
- 子代理继承当前 sandbox 和权限。
- 不要把强依赖的连续步骤拆给多个 subagent。

