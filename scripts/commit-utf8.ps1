$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$messagePath = Join-Path $repoRoot "commit-msg.txt"

if (-not (Test-Path $messagePath)) {
  Write-Error "commit-msg.txt not found at repository root."
}

# Ensure UTF-8 settings for this process
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

# Enforce UTF-8 log/commit encoding for local repository
git -C $repoRoot config i18n.commitEncoding utf-8 | Out-Null
git -C $repoRoot config i18n.logOutputEncoding utf-8 | Out-Null

git -C $repoRoot commit -F $messagePath
