# deploy.ps1 - One-click initial push for eduuk-org to GitHub

Set-Location -Path $PSScriptRoot

$RemoteUrl = "https://github.com/wbn580/eduuk-org.git"

Write-Host "=== Study in UK (eduuk.org) - Initial Deploy ===" -ForegroundColor Cyan
Write-Host "Folder: $PSScriptRoot" -ForegroundColor Gray
Write-Host "Remote: $RemoteUrl" -ForegroundColor Gray
Write-Host ""

# 1. Initialize git repo if not already
if (-not (Test-Path ".git")) {
    Write-Host "[1/6] Initializing git repository..." -ForegroundColor Yellow
    git init | Out-Null
} else {
    Write-Host "[1/6] Git repository already initialized." -ForegroundColor Gray
}

# 2. Stage all files
Write-Host "[2/6] Staging all files..." -ForegroundColor Yellow
git add .

# 3. Commit (only if anything staged)
Write-Host "[3/6] Creating commit if needed..." -ForegroundColor Yellow
$commitMsg = "Initial commit: Study in UK - 100 Q&A articles + Astro template"
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m $commitMsg
} else {
    Write-Host "    (nothing to commit - commit already exists)" -ForegroundColor Gray
}

# 4. Ensure main branch
Write-Host "[4/6] Setting branch to 'main'..." -ForegroundColor Yellow
git branch -M main 2>&1 | Out-Host

# 5. Set remote (swallow errors from missing origin)
Write-Host "[5/6] Configuring remote 'origin'..." -ForegroundColor Yellow
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $RemoteUrl
} else {
    git remote add origin $RemoteUrl
}
git remote -v

# 6. Push
Write-Host ""
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "(If a browser window opens asking you to sign in to GitHub, please complete it.)" -ForegroundColor Gray
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== DONE ===" -ForegroundColor Green
    Write-Host "Your code is now on GitHub: $RemoteUrl" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=== PUSH FAILED (exit code $LASTEXITCODE) ===" -ForegroundColor Red
    Write-Host "Scroll up to read the error. Most common cause: GitHub auth cancelled." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to close this window..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
