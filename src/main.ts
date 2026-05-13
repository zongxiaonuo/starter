// 设备类型定义
type DeviceStatus = 'online' | 'warning' | 'offline';
type DeviceType = 'server' | 'switch' | 'router' | 'firewall' | 'workstation' | 'other';

interface Device {
  id: number;
  name: string;
  ip: string;
  type: DeviceType;
  location: string;
  status: DeviceStatus;
  lastCheck: Date;
}

interface Alert {
  id: number;
  deviceId: number;
  deviceName: string;
  message: string;
  level: 'critical' | 'warning' | 'info';
  time: Date;
}

// 设备类型显示名称映射
const deviceTypeLabels: Record<DeviceType, string> = {
  server: '服务器',
  switch: '交换机',
  router: '路由器',
  firewall: '防火墙',
  workstation: '工作站',
  other: '其他'
};

// 状态显示名称映射
const statusLabels: Record<DeviceStatus, string> = {
  online: '在线',
  warning: '告警',
  offline: '离线'
};

// 示例数据
let devices: Device[] = [
  { id: 1, name: '主数据库服务器', ip: '192.168.1.10', type: 'server', location: '机房A', status: 'online', lastCheck: new Date() },
  { id: 2, name: 'Web 服务器 01', ip: '192.168.1.11', type: 'server', location: '机房A', status: 'online', lastCheck: new Date() },
  { id: 3, name: '核心交换机', ip: '192.168.1.1', type: 'switch', location: '机房B', status: 'warning', lastCheck: new Date() },
  { id: 4, name: '边界路由器', ip: '192.168.1.2', type: 'router', location: '机房B', status: 'online', lastCheck: new Date() },
  { id: 5, name: '防火墙主设备', ip: '192.168.1.3', type: 'firewall', location: '机房B', status: 'online', lastCheck: new Date() },
  { id: 6, name: '备份服务器', ip: '192.168.1.20', type: 'server', location: '机房A', status: 'offline', lastCheck: new Date(Date.now() - 3600000) },
  { id: 7, name: '应用服务器 01', ip: '192.168.1.30', type: 'server', location: '机房A', status: 'online', lastCheck: new Date() },
  { id: 8, name: '接入交换机 01', ip: '192.168.1.4', type: 'switch', location: '机房C', status: 'online', lastCheck: new Date() },
];

let alerts: Alert[] = [
  { id: 1, deviceId: 3, deviceName: '核心交换机', message: 'CPU 使用率超过 80%', level: 'warning', time: new Date(Date.now() - 1800000) },
  { id: 2, deviceId: 6, deviceName: '备份服务器', message: '设备离线超过 1 小时', level: 'critical', time: new Date(Date.now() - 3600000) },
  { id: 3, deviceId: 2, deviceName: 'Web 服务器 01', message: '磁盘空间不足 10%', level: 'warning', time: new Date(Date.now() - 7200000) },
];

let nextDeviceId = 9;
let nextAlertId = 4;

// DOM 元素
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const currentTimeEl = document.getElementById('current-time');
const onlineCountEl = document.getElementById('online-count');
const warningCountEl = document.getElementById('warning-count');
const offlineCountEl = document.getElementById('offline-count');
const totalCountEl = document.getElementById('total-count');
const deviceTbody = document.getElementById('device-tbody');
const devicesTbody = document.getElementById('devices-tbody');
const alertsList = document.getElementById('alerts-list');
const addDeviceBtn = document.getElementById('add-device-btn');
const addDeviceModal = document.getElementById('add-device-modal');
const addDeviceForm = document.getElementById('add-device-form');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const filterStatus = document.getElementById('filter-status') as HTMLSelectElement;

// 更新当前时间
function updateCurrentTime() {
  if (currentTimeEl) {
    const now = new Date();
    currentTimeEl.textContent = now.toLocaleString('zh-CN');
  }
}

// 更新统计数据
function updateStats() {
  const online = devices.filter(d => d.status === 'online').length;
  const warning = devices.filter(d => d.status === 'warning').length;
  const offline = devices.filter(d => d.status === 'offline').length;
  const total = devices.length;

  if (onlineCountEl) onlineCountEl.textContent = online.toString();
  if (warningCountEl) warningCountEl.textContent = warning.toString();
  if (offlineCountEl) offlineCountEl.textContent = offline.toString();
  if (totalCountEl) totalCountEl.textContent = total.toString();
}

// 格式化时间
function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes} 分钟前`;
  if (hours < 24) return `${hours} 小时前`;
  return `${days} 天前`;
}

// 创建设备表格行
function createDeviceRow(device: Device, showLocation: boolean = false): HTMLTableRowElement {
  const tr = document.createElement('tr');
  let html = `
    <td>${device.name}</td>
    <td>${device.ip}</td>
    <td>${deviceTypeLabels[device.type]}</td>
  `;
  
  if (showLocation) {
    html += `<td>${device.location}</td>`;
  }
  
  html += `
    <td><span class="status-badge ${device.status}">${statusLabels[device.status]}</span></td>
    <td>${formatTime(device.lastCheck)}</td>
    <td>
      <button class="btn-primary btn-small" data-action="view" data-id="${device.id}">查看</button>
      <button class="btn-secondary btn-small" data-action="delete" data-id="${device.id}">删除</button>
    </td>
  `;
  
  tr.innerHTML = html;
  return tr;
}

// 更新设备表格
function updateDeviceTables() {
  if (deviceTbody) {
    deviceTbody.innerHTML = '';
    devices.slice(0, 5).forEach(device => {
      deviceTbody.appendChild(createDeviceRow(device));
    });
  }

  if (devicesTbody) {
    updateFilteredDevices();
  }
}

// 更新过滤后的设备列表
function updateFilteredDevices() {
  if (!devicesTbody) return;
  
  const search = searchInput?.value.toLowerCase() || '';
  const status = filterStatus?.value || '';
  
  const filtered = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(search) || device.ip.includes(search);
    const matchesStatus = !status || device.status === status;
    return matchesSearch && matchesStatus;
  });
  
  devicesTbody.innerHTML = '';
  filtered.forEach(device => {
    devicesTbody.appendChild(createDeviceRow(device, true));
  });
}

// 更新告警列表
function updateAlertsList() {
  if (!alertsList) return;
  
  alertsList.innerHTML = '';
  alerts.forEach(alert => {
    const alertEl = document.createElement('div');
    alertEl.className = `alert-item ${alert.level}`;
    alertEl.innerHTML = `
      <div class="alert-content">
        <h4>${alert.deviceName}</h4>
        <p>${alert.message}</p>
      </div>
      <div class="alert-time">${formatTime(alert.time)}</div>
    `;
    alertsList.appendChild(alertEl);
  });
}

// 切换视图
function switchView(viewName: string) {
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });
  
  views.forEach(view => {
    view.classList.toggle('active', view.id === `${viewName}-view`);
  });
}

// 初始化事件监听
function initEventListeners() {
  // 导航菜单
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = item.dataset.view;
      if (viewName) {
        switchView(viewName);
      }
    });
  });

  // 添加设备按钮
  addDeviceBtn?.addEventListener('click', () => {
    addDeviceModal?.classList.add('active');
  });

  // 关闭模态框
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      addDeviceModal?.classList.remove('active');
    });
  });

  // 点击模态框外部关闭
  addDeviceModal?.addEventListener('click', (e) => {
    if (e.target === addDeviceModal) {
      addDeviceModal.classList.remove('active');
    }
  });

  // 添加设备表单
  addDeviceForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('device-name') as HTMLInputElement;
    const ipInput = document.getElementById('device-ip') as HTMLInputElement;
    const typeInput = document.getElementById('device-type') as HTMLSelectElement;
    const locationInput = document.getElementById('device-location') as HTMLInputElement;
    
    const newDevice: Device = {
      id: nextDeviceId++,
      name: nameInput.value,
      ip: ipInput.value,
      type: typeInput.value as DeviceType,
      location: locationInput.value,
      status: 'online',
      lastCheck: new Date()
    };
    
    devices.push(newDevice);
    updateStats();
    updateDeviceTables();
    
    addDeviceModal?.classList.remove('active');
    addDeviceForm.reset();
  });

  // 搜索和筛选
  searchInput?.addEventListener('input', updateFilteredDevices);
  filterStatus?.addEventListener('change', updateFilteredDevices);

  // 设备表格操作按钮委托
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.action && target.dataset.id) {
      const id = parseInt(target.dataset.id);
      const action = target.dataset.action;
      
      if (action === 'view') {
        const device = devices.find(d => d.id === id);
        if (device) {
          alert(`设备详情:\n名称: ${device.name}\nIP: ${device.ip}\n类型: ${deviceTypeLabels[device.type]}\n位置: ${device.location}\n状态: ${statusLabels[device.status]}`);
        }
      } else if (action === 'delete') {
        if (confirm('确定要删除此设备吗？')) {
          devices = devices.filter(d => d.id !== id);
          updateStats();
          updateDeviceTables();
        }
      }
    }
  });
}

// 模拟数据更新
function simulateDataUpdate() {
  // 随机更新一些设备状态
  devices.forEach(device => {
    if (Math.random() < 0.1) {
      const statuses: DeviceStatus[] = ['online', 'warning', 'offline'];
      device.status = statuses[Math.floor(Math.random() * statuses.length)];
      device.lastCheck = new Date();
    }
  });
  
  updateStats();
  updateDeviceTables();
  updateCurrentTime();
}

// 初始化应用
function init() {
  updateCurrentTime();
  updateStats();
  updateDeviceTables();
  updateAlertsList();
  initEventListeners();
  
  // 每分钟更新一次时间
  setInterval(updateCurrentTime, 60000);
  
  // 每 30 秒模拟一次数据更新
  setInterval(simulateDataUpdate, 30000);
}

// 启动应用
init();
