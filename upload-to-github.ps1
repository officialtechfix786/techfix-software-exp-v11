$ErrorActionPreference = 'Stop'
$repo = 'https://github.com/officialtechfix786/techfix-software-exp-v11.git'
$project = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $project

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is not installed. Install Git, reopen PowerShell, and run this script again.' }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI is not installed. Install it with: winget install --id GitHub.cli' }

gh auth setup-git
if (-not (Test-Path -LiteralPath '.git')) { git init }
git add index.html css js database pages images assets brands mobiles software upload-to-github.ps1
if (git diff --cached --quiet) { Write-Host 'No new website changes to upload.'; exit 0 }
git commit -m 'feat: publish TechFix Software EXP v11 website'
git branch -M main
$existing = git remote 2>$null
if ($existing -contains 'origin') { git remote set-url origin $repo } else { git remote add origin $repo }
git push -u origin main
Write-Host "Upload complete: https://github.com/officialtechfix786/techfix-software-exp-v11"
