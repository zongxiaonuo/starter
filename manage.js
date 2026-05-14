const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_NAME = 'TypeScript Web App';
const PID_FILE = path.join(__dirname, '.app.pid');
const LOG_FILE = path.join(__dirname, 'app.log');
const LOG_STREAM = fs.createWriteStream(LOG_FILE, { flags: 'a' });

function isRunning() {
    if (fs.existsSync(PID_FILE)) {
        const pid = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim());
        try {
            process.kill(pid, 0);
            return pid;
        } catch (e) {
            fs.unlinkSync(PID_FILE);
            return false;
        }
    }
    return false;
}

function start() {
    const runningPid = isRunning();
    if (runningPid) {
        console.log(`[WARNING] ${APP_NAME} is already running (PID: ${runningPid})`);
        return;
    }

    console.log(`Starting ${APP_NAME}...`);

    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(npm, ['run', 'dev'], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
        cwd: __dirname
    });

    child.unref();
    fs.writeFileSync(PID_FILE, child.pid.toString(), 'utf8');

    setTimeout(() => {
        const pid = isRunning();
        if (pid) {
            console.log(`[SUCCESS] ${APP_NAME} started successfully (PID: ${pid})`);
            console.log('Access at: http://localhost:3000');
        } else {
            console.log(`[ERROR] ${APP_NAME} failed to start`);
            if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
        }
    }, 3000);
}

function stop() {
    const pid = isRunning();
    if (!pid) {
        console.log(`[WARNING] ${APP_NAME} is not running`);
        return;
    }

    console.log(`Stopping ${APP_NAME} (PID: ${pid})...`);

    try {
        process.kill(pid);
    } catch (e) {
        // Try force kill on Windows
        if (process.platform === 'win32') {
            try {
                exec(`taskkill /F /PID ${pid}`);
            } catch (e2) {}
        }
    }

    setTimeout(() => {
        if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
        console.log(`[SUCCESS] ${APP_NAME} stopped`);
    }, 1500);
}

function status() {
    const pid = isRunning();
    if (pid) {
        console.log(`[RUNNING] ${APP_NAME} is running`);
        console.log(`  PID:        ${pid}`);
        console.log(`  Log file:   ${LOG_FILE}`);
        console.log('  Access at:  http://localhost:3000');
    } else {
        console.log(`[STOPPED] ${APP_NAME} is not running`);
    }
}

const command = process.argv[2];
switch (command) {
    case 'start':
        start();
        break;
    case 'stop':
        stop();
        break;
    case 'restart':
        stop();
        setTimeout(start, 2000);
        break;
    case 'status':
        status();
        break;
    default:
        console.log('Usage: node manage.js [start|stop|restart|status]');
}
