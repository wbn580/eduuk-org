# deploy.ps1 - One-click initial push for eduuk-org to GitHub
# Double-click this file (or right-click -> Run with PowerShell) to commit and push.
# IMPORTANT: The $RemoteUrl below will be filled in after the GitHub repo is created.

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

# === FILL THIS IN AFTER CREATING THE GITHUB REPO ===
$RemoteUrl = "https://github.com/wbn580/eduuk-org.git"

Write-Host "=== Study in UK (eduuk.org) - Initial Deploy ===" -ForegroundColor Cyan
Write-Host "Folder: $PSScriptRoot" -ForegroundColor Gray
Write-Host "Remote: $RemoteUrl" -ForegroundColor Gray
Write-Host ""

# 1. Initialize git repo if not already
if (-not (Test-Path ".git")) {
    Write-Host "[1/6] Initializing git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/6] Git repository already initialized." -ForegroundColor Gray
}

# 2. Stage all files
Write-Host "[2/6] Staging all files..." -ForegroundColor Yellow
git add .

# 3. Commit
Write-Host "[3/6] Creating initial commit..." -ForegroundColor Yellow
$commitMsg = "Initial commit: Study in UK - 100 Q&A articles + Astro template"
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    git commit -m $commitMsg
} else {
    Write-Host "    (nothing to commit)" -ForegroundColor Gray
}

# 4. Ensure main branch
Write-Host "[4/6] Setting branch to 'main'..." -ForegroundColor Yellow
git branch -M main

# 5. Set remote
Write-Host "[5/6] Configuring remote 'origin'..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $RemoteUrl

# 6. Push
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Your code is now on GitHub. Cloudflare Pages will auto-build and deploy." -ForegroundColor Green
Pause
