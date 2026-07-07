# 任务 03：Automation 练习

## 目标

练习如何设计一个可重复执行的 Codex 自动化任务。

## 任务内容

设计一个每日巡检自动化：

- 读取 `virtual-project/data/tasks.json`；
- 找出 overdue 的任务；
- 找出 blocked 的任务；
- 生成一段简短巡检报告；
- 如果没有问题，说明可以自动归档；
- 如果发现问题，应该出现在 Triage/inbox。

## 注意

这个任务先练“设计自动化提示词”，不要求真的创建自动化。

如果要创建，应该先手动跑一次提示词，确认输出符合预期。

## 验收标准

Codex 应该输出：

1. 适合 thread automation 还是 standalone/project automation；
2. 推荐的 schedule；
3. 自动化 prompt；
4. 风险和权限说明；
5. 第一次手动测试步骤。

## 推荐提示词

```text
我想练 Automation。
请阅读 tasks/03-automation-lab.md 和 automations/examples.md。
请先设计自动化提示词，不要真的创建自动化。
```

