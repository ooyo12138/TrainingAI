# Virtual Project: Local Task Board

这是一个普通的本地任务看板项目，用来练习 Codex。

它不需要数据库，不需要 API Key，不需要第三方依赖。

## 运行

```powershell
node server.js
```

默认地址：

```text
http://localhost:4173
```

## 测试

```powershell
node tests/run-tests.js
```

## 数据

任务数据保存在：

```text
data/tasks.json
```

## 主要模块

- `server.js`：HTTP server 和 API。
- `src/storage.js`：读写 JSON 数据。
- `src/board.js`：任务筛选、统计、状态修改。
- `src/report.js`：生成巡检报告。
- `public/`：页面。
- `tests/run-tests.js`：零依赖测试。

