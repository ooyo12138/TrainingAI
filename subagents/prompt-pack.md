# Subagent Prompt Pack

## 代码质量审查

```text
Spawn an agent named code-reviewer.
Scope: virtual-project/src and virtual-project/server.js.
Goal: Find correctness bugs, maintainability issues, and unnecessary complexity.
Do not edit files. Return findings with file paths and severity.
```

## 测试缺口审查

```text
Spawn an agent named test-reviewer.
Scope: virtual-project/tests/run-tests.js.
Goal: Identify missing edge cases and propose focused tests.
Do not edit files. Return findings and suggested assertions.
```

## MCP 设计审查

```text
Spawn an agent named mcp-reviewer.
Scope: mcp-servers/page-control and .codex/config.toml.
Goal: Review MCP tool names, schemas, read/write safety, and configuration.
Do not edit files. Return risks and fixes.
```

## 页面体验审查

```text
Spawn an agent named ux-reviewer.
Scope: virtual-project/public.
Goal: Review dashboard clarity, empty states, controls, and page copy.
Do not edit files. Return UX findings and small improvement suggestions.
```

