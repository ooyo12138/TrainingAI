# Worktree 练习手册

## Worktree 是什么

Worktree 是 Git 的多个工作区。Codex App 可以在一个独立 worktree 里跑任务，让它改代码、跑测试，而不影响你当前 Local 目录。

## 什么时候用

- 你想让 Codex 在后台做实验。
- 一个功能不确定是否要合并。
- 你想并行跑多个任务。
- 自动化任务可能产生改动，不能干扰当前工作。

## 训练步骤

1. 确认 `trainingAI` 是 Git 仓库。
2. 在 Codex App 新建线程时选择 Worktree。
3. 使用 `tasks/02-worktree-lab.md`。
4. 完成后检查 diff。
5. 决定 Handoff 到 Local、创建分支，或丢弃 worktree。

## 常见误区

- Worktree 不是复制粘贴项目；它依赖 Git。
- 同一个分支不能同时被多个 worktree checkout。
- `.env` 等被 gitignore 的文件不会自动进入 worktree，除非配置 `.worktreeinclude`。

