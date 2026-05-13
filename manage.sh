#!/bin/bash

# Web应用管理脚本
# 用法: ./manage.sh [start|stop|restart]

APP_NAME="TypeScript Web App"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$APP_DIR/.app.pid"
LOG_FILE="$APP_DIR/app.log"

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_usage() {
    echo "用法: $0 [start|stop|restart|status]"
    echo "  start   - 启动web应用"
    echo "  stop    - 关闭web应用"
    echo "  restart - 重启web应用"
    echo "  status  - 查看应用状态"
}

check_node_env() {
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}错误: npm 未安装${NC}"
        exit 1
    fi
}

is_running() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0
        else
            # PID文件存在但进程已死，清理文件
            rm -f "$PID_FILE"
            return 1
        fi
    fi
    return 1
}

start_app() {
    if is_running; then
        echo -e "${YELLOW}$APP_NAME 已经在运行中 (PID: $(cat "$PID_FILE"))${NC}"
        return 0
    fi

    echo "正在启动 $APP_NAME..."
    
    cd "$APP_DIR" || exit 1
    
    # 检查node_modules是否存在
    if [ ! -d "node_modules" ]; then
        echo "正在安装依赖..."
        npm install
    fi

    # 启动开发服务器
    nohup npm run dev > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    
    sleep 2
    
    if is_running; then
        echo -e "${GREEN}$APP_NAME 启动成功 (PID: $(cat "$PID_FILE"))${NC}"
        echo "日志文件: $LOG_FILE"
        echo "访问地址: http://localhost:3001"
    else
        echo -e "${RED}$APP_NAME 启动失败${NC}"
        echo "查看日志: tail -f $LOG_FILE"
        rm -f "$PID_FILE"
        exit 1
    fi
}

stop_app() {
    if ! is_running; then
        echo -e "${YELLOW}$APP_NAME 未在运行${NC}"
        return 0
    fi

    local pid=$(cat "$PID_FILE")
    echo "正在关闭 $APP_NAME (PID: $pid)..."
    
    # 优雅终止
    kill "$pid" 2>/dev/null
    
    # 等待进程结束
    for i in {1..10}; do
        if ! ps -p "$pid" > /dev/null 2>&1; then
            break
        fi
        sleep 0.5
    done
    
    # 如果进程仍在运行，强制终止
    if ps -p "$pid" > /dev/null 2>&1; then
        echo "强制终止进程..."
        kill -9 "$pid" 2>/dev/null
        sleep 1
    fi
    
    rm -f "$PID_FILE"
    echo -e "${GREEN}$APP_NAME 已关闭${NC}"
}

restart_app() {
    stop_app
    sleep 1
    start_app
}

status_app() {
    if is_running; then
        local pid=$(cat "$PID_FILE")
        echo -e "${GREEN}● $APP_NAME 正在运行${NC}"
        echo "  PID:        $pid"
        echo "  启动时间:   $(ps -p "$pid" -o lstart=)"
        echo "  日志文件:   $LOG_FILE"
        echo "  访问地址:   http://localhost:3001"
    else
        echo -e "${RED}● $APP_NAME 未运行${NC}"
    fi
}

# 主逻辑
case "$1" in
    start)
        check_node_env
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        check_node_env
        restart_app
        ;;
    status)
        status_app
        ;;
    *)
        print_usage
        exit 1
        ;;
esac

exit 0