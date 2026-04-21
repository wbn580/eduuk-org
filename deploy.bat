@echo off
REM Double-click this file to push eduuk-org to GitHub.
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
pause
