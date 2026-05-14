@echo off
REM Web Application Management Script (Windows Batch)
REM Usage: manage.bat [start|stop|restart|status]

set "APP_DIR=%~dp0"
cd /d "%APP_DIR%"

if "%~1"=="" goto usage
if "%~1"=="start" goto start
if "%~1"=="stop" goto stop
if "%~1"=="restart" goto restart
if "%~1"=="status" goto status
goto usage

:usage
echo Usage: manage.bat [start^|stop^|restart^|status]
echo   start   - Start web application
echo   stop    - Stop web application
echo   restart - Restart web application
echo   status  - Check application status
goto end

:start
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
node manage.js start
goto end

:stop
node manage.js stop
goto end

:restart
node manage.js stop
timeout /t 1 /nobreak >nul
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
node manage.js start
goto end

:status
node manage.js status
goto end

:end
