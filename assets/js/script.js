// assets/js/script.js - FairVerse 官网交互脚本

// 1. 多语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取语言切换相关元素
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langCodeSpan = document.querySelector('.lang-code');
    
    // 默认语言，尝试从本地存储读取，没有则默认为英文
    let currentLang = localStorage.getItem('fairverse-lang') || 'en';
    
    // 初始化：根据保存的语言设置页面
    updatePageLanguage(currentLang);
    
    // 点击"EN"按钮显示/隐藏下拉菜单
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止事件冒泡
            langDropdown.classList.toggle('show');
        });
    }
    
    // 点击下拉菜单中的语言选项
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            
            // 更新当前语言
            currentLang = selectedLang;
            
            // 保存到浏览器本地存储
            localStorage.setItem('fairverse-lang', selectedLang);
            
            // 更新按钮显示
            if (langCodeSpan) {
                langCodeSpan.textContent = selectedLang.toUpperCase();
            }
            
            // 更新页面所有文本
            updatePageLanguage(selectedLang);
            
            // 隐藏下拉菜单
            langDropdown.classList.remove('show');
        });
    });
    
    // 点击页面其他地方时关闭下拉菜单
    document.addEventListener('click', function() {
        if (langDropdown) {
            langDropdown.classList.remove('show');
        }
    });
    
    // 阻止下拉菜单内部的点击事件冒泡（防止触发document的点击事件）
    if (langDropdown) {
        langDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 核心函数：更新页面文本内容
    function updatePageLanguage(lang) {
        // 更新所有带有 data-en 和 data-zh 属性的元素
        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.getAttribute('data-zh') || element.textContent;
            } else {
                element.textContent = element.getAttribute('data-en') || element.textContent;
            }
        });
        
        // 更新按钮文字（针对有 data-en/data-zh 的按钮）
        document.querySelectorAll('.btn[data-en]').forEach(btn => {
            if (lang === 'zh') {
                btn.textContent = btn.getAttribute('data-zh') || btn.textContent;
            } else {
                btn.textContent = btn.getAttribute('data-en') || btn.textContent;
            }
        });
        
        // 更新页面标题（可选）
        if (lang === 'zh') {
            document.title = 'FairVerse - 公平公开的虚拟世界平台';
        } else {
            document.title = 'FairVerse - Fair and Open Virtual World Platform';
        }
        
        // 更新按钮代码显示
        if (langCodeSpan) {
            langCodeSpan.textContent = lang.toUpperCase();
        }
        
        console.log('Language switched to:', lang);
    }
});

// 2. 导航栏移动端响应式菜单
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 切换汉堡菜单动画
            const bars = this.querySelectorAll('.bar');
            if (bars.length >= 3) {
                bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
                bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
                bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
            }
        });
    }
    
    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // 重置汉堡菜单动画
                if (navToggle) {
                    const bars = navToggle.querySelectorAll('.bar');
                    if (bars.length >= 3) {
                        bars[0].style.transform = 'none';
                        bars[1].style.opacity = '1';
                        bars[2].style.transform = 'none';
                    }
                }
            }
        });
    });
});

// 3. 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
        }
    }
});
// 4. 表单提交处理（订阅表单）
const emailForm = document.getElementById('email-form');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('email-input');
        const formMessage = document.getElementById('form-message');
        
        const email = emailInput.value.trim();
        
        // 简单的邮箱验证
        if (!email || !email.includes('@')) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = '#f87171';
            return;
        }
        
        // 模拟提交成功
        formMessage.textContent = 'Thank you! You have been subscribed.';
        formMessage.style.color = '#4ade80';
        emailInput.value = '';
        
        // 3秒后清空成功消息
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000);
    });
}

// ========== 5. 新增：任务中心功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前页面是否为任务中心
    const isTasksPage = window.location.pathname.includes('tasks.html') || 
                       document.querySelector('.task-center-container');
    
    if (!isTasksPage) return;
    
    console.log('Initializing Task Center...');
    
    // 模拟任务数据
    const mockTasks = [
        {
            id: 1,
            title: "Design FairVerse Social Media Banner",
            description: "Create a captivating banner (1920x1080) that represents 'A Universe Built by You' for our Twitter & Discord.",
            reward: { token: 800, nft: "Founder Designer NFT" },
            category: "design",
            status: "open",
            submissions: 7
        },
        {
            id: 2,
            title: "Write a Tutorial: Getting Started with Godot in FairVerse",
            description: "Write a beginner-friendly guide (600+ words) on using Godot to create your first FairVerse asset.",
            reward: { token: 500, nft: null },
            category: "content",
            status: "open",
            submissions: 3
        },
        {
            id: 3,
            title: "Community Growth Challenge",
            description: "Invite 15 new verified members to our Discord and help them get started.",
            reward: { token: 1200, nft: "Community Pioneer NFT" },
            category: "outreach",
            status: "open",
            submissions: 18
        },
        {
            id: 4,
            title: "Brain-Computer Interface Concept Design",
            description: "Design a UI/UX concept for our future BCI interface. Show how users might interact with thoughts.",
            reward: { token: 1500, nft: "Innovator NFT" },
            category: "design",
            status: "open",
            submissions: 4
        },
        {
            id: 5,
            title: "Create a FairVerse World Template",
            description: "Build a basic world template in Godot that others can use as a starting point.",
            reward: { token: 2000, nft: "Builder NFT" },
            category: "development",
            status: "open",
            submissions: 2
        }
    ];

    // 任务中心核心元素
    const taskList = document.getElementById('taskList');
    const connectBtn = document.getElementById('connectWalletBtn');
    const rewardFilter = document.getElementById('rewardFilter');
    const myTasksList = document.getElementById('myTasksList');
    
    // 用户状态
    let isWalletConnected = false;
    let userAcceptedTasks = JSON.parse(localStorage.getItem('fairverse_user_tasks')) || [];
    
    // 初始化任务列表
    function renderTasks(tasks = mockTasks) {
        if (!taskList) return;
        
        taskList.innerHTML = tasks.map(task => `
            <div class="task-card">
                <span class="task-category">${task.category}</span>
                <h3>${task.title}</h3>
                <p>${task.description}</p >
                <div class="reward">
                    <div class="reward-token">${task.reward.token} $H</div>
                    ${task.reward.nft ? `<div class="reward-nft">+ ${task.reward.nft}</div>` : ''}
                    <div style="margin-left:auto; font-size:0.9rem; color:#94a3b8;">
                        <i>Submissions: ${task.submissions}</i>
                    </div>
                </div>
                <button class="claim-btn" onclick="claimTask(${task.id})" ${!isWalletConnected ? 'disabled' : ''}>
                    ${!isWalletConnected ? '🔒 Connect Wallet First' : '🚀 Accept Task'}
                </button>
            </div>
        `).join('');
    }
    
    // 渲染用户已接受的任务
    function renderUserTasks() {
        if (!myTasksList) return;
        
        if (userAcceptedTasks.length === 0) {
            myTasksList.innerHTML = '<p class="empty-state">No tasks accepted yet. Connect wallet and accept a task!</p >';
            return;
        }
        
        myTasksList.innerHTML = userAcceptedTasks.map(taskId => {
            const task = mockTasks.find(t => t.id === taskId);
            if (!task) return '';
            
            return `
                <div class="user-task-item">
                    <strong>${task.title}</strong>
                    <small>Status: <span class="status-pending">Pending Submission</span></small>
                </div>
            `;
        }).join('');
    }
    
    // 模拟钱包连接
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            if (isWalletConnected) return;
            
            // 模拟连接过程
            this.innerHTML = '<span class="spinner"></span> Connecting...';
            this.disabled = true;
            
            setTimeout(() => {
                isWalletConnected = true;
                this.innerHTML = '✅ Wallet Connected (0x7f3...c42)';
                this.classList.add('connected');
                
                // 更新任务按钮状态
                document.querySelectorAll('.claim-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.textContent = '🚀 Accept Task';
                });
                
                // 显示用户任务
                renderUserTasks();
                
                // 显示连接成功提示
                showNotification('Wallet connected successfully!', 'success');
            }, 800);
        });
    }
    
    // 任务筛选
    if (rewardFilter) {
        rewardFilter.addEventListener('change', function() {
            const filterValue = this.value;
            let filteredTasks = [...mockTasks];
            
            if (filterValue === 'token') {
                filteredTasks = mockTasks.filter(task => !task.reward.nft);
            } else if (filterValue === 'nft') {
                filteredTasks = mockTasks.filter(task => task.reward.nft);
            }
            
            renderTasks(filteredTasks);
        });
    }
    
    // 全局函数：接受任务
    window.claimTask = function(taskId) {
        if (!isWalletConnected) {
            showNotification('Please connect your wallet first!', 'error');
            return;
        }
        
        const task = mockTasks.find(t => t.id === taskId);
        if (!task) return;
        
        // 检查是否已接受
        if (userAcceptedTasks.includes(taskId)) {
            showNotification('You have already accepted this task!', 'warning');
            return;
        }
        
        // 添加到用户任务列表
        userAcceptedTasks.push(taskId);
        localStorage.setItem('fairverse_user_tasks', JSON.stringify(userAcceptedTasks));
        
        // 显示成功信息
        const successMessage = `Task #${taskId} accepted!<br><br>
                               <strong>Next Steps:</strong><br>
                               1. Join our <a href=" " target="_blank" style="color:#a5b4fc;">Discord</a ><br>
                               2. Submit your work in <strong>#task-submissions</strong> channel<br>
                               3. Get reviewed & receive rewards`;
        
        showNotification(successMessage, 'success', 8000);
        
        // 更新用户任务面板
        renderUserTasks();
        
        // 更新任务提交数（模拟）
        task.submissions += 1;
        renderTasks();
        
        console.log(`Task ${taskId} accepted by user`);
    };
    
    // 显示通知函数
    function showNotification(message, type = 'info', duration = 5000) {
        // 移除现有通知
        const existingNotification = document.querySelector('.global-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建新通知
        const notification = document.createElement('div');
        notification.className = `global-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 关闭按钮事件
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // 自动关闭
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
        }
    }
    
    // 添加通知样式（动态注入）
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .global-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            border-left: 4px solid #3b82f6;
            border-radius: 12px;
            padding: 16px 20px;
            color: white;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transform: translateX(150%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .global-notification.show {
            transform: translateX(0);
        }
        .notification-success { border-color: #10b981; }
        .notification-error { border-color: #f87171; }
        .notification-warning { border-color: #fbbf24; }
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        .notification-content a {
            color: #a5b4fc;
            text-decoration: underline;
        }
        .notification-close {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 0 0 15px;
            line-height: 1;
        }
        .notification-close:hover {
            color: white;
        }
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .user-task-item {
            background: rgba(255,255,255,0.05);
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 3px solid #8b5cf6;
        }
        .user-task-item strong {
            display: block;
            color: #e2e8f0;
            margin-bottom: 5px;
            font-size: 0.95rem;
        }
        .user-task-item small {
            color: #94a3b8;
            font-size: 0.85rem;
        }
        .status-pending {
            color: #fbbf24;
            font-weight: 600;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // 初始化渲染
    renderTasks();
    renderUserTasks();
    
    // 如果用户已有任务，自动标记为已连接
    if (userAcceptedTasks.length > 0) {
        isWalletConnected = true;
        if (connectBtn) {
            connectBtn.innerHTML = '✅ Wallet Connected (0x7f3...c42)';
            connectBtn.classList.add('connected');
        }
        renderUserTasks();
    }
});