$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$project = Join-Path $root "virtual-project"
$mcp = Join-Path $root "mcp-servers\page-control"

Write-Host "trainingAI environment check" -ForegroundColor Cyan
Write-Host "Root: $root"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js was not found in PATH." -ForegroundColor Red
  exit 1
}

Push-Location $project
try {
  Write-Host "Running virtual project tests..." -ForegroundColor Cyan
  node tests/run-tests.js
}
finally {
  Pop-Location
}

Push-Location $mcp
try {
  Write-Host "Running MCP handler smoke test..." -ForegroundColor Cyan
  node test-handler.js
}
finally {
  Pop-Location
}

Write-Host "All checks passed." -ForegroundColor Green

