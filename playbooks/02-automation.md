# Automation 练习手册

## Automation 是什么

Automation 是让 Codex 定时或重复执行任务。它适合巡检、提醒、报告、定期 review。

## 两类常见自动化

- Thread automation：绑定当前线程，保留上下文，适合持续跟进一个正在发生的事情。
- Standalone / project automation：每次独立运行，适合定期巡检一个或多个项目。

## 训练原则

先手动跑 prompt，再创建 automation。

一个好 automation prompt 应该说明：

- 每次运行要检查什么；
- 发现什么算有问题；
- 没问题时如何汇报；
- 有问题时如何输出；
- 是否允许修改文件；
- 什么时候应该停止或询问用户。

## 本项目推荐练习

见 `tasks/03-automation-lab.md` 和 `automations/examples.md`。

