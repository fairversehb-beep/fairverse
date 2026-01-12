// assets/js/script.js - FairVerse 官网主交互脚本 (增强双语版)

// 1. 增强版多语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langCodeSpan = document.querySelector('.lang-code');
    
    // 从本地存储读取语言，默认英文
    let currentLang = localStorage.getItem('fairverse-lang') || 'en';
    
    // 初始化：根据保存的语言设置页面
    updatePageLanguage(currentLang);
    
    // 点击“EN/中”按钮显示/隐藏下拉菜单
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
    }
    
    // 点击下拉菜单中的语言选项
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            currentLang = selectedLang;
            updatePageLanguage(selectedLang);
            localStorage.setItem('fairverse-lang', selectedLang);
            if (langCodeSpan) langCodeSpan.textContent = selectedLang.toUpperCase();
            langDropdown.classList.remove('show');
        });
    });
    
    // 点击页面其他地方时关闭下拉菜单
    document.addEventListener('click', function() {
        if (langDropdown) langDropdown.classList.remove('show');
    });
    if (langDropdown) {
        langDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 核心增强函数：更新页面文本并协调谷歌翻译
    function updatePageLanguage(lang) {
        // 更新所有带有 data-en 和 data-zh 属性的元素
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`) || element.textContent;
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
        
        // 更新页面标题
        const titleEl = document.querySelector('title');
        const titleData = titleEl.getAttribute(`data-${lang}`);
        if (titleData) document.title = titleData;
        
        // 更新按钮代码显示
        if (langCodeSpan) {
            langCodeSpan.textContent = lang.toUpperCase();
        }
        
        // === 核心增强：智能协调谷歌翻译 ===
        const htmlEl = document.documentElement;
        htmlEl.lang = lang; // 告诉浏览器当前语言
        
        if (lang === 'zh') {
            // 切换到中文时：允许谷歌翻译（作为内容补充），但我们已提供精准翻译
            htmlEl.translate = 'yes';
            console.info('FairVerse: 已切换到中文。如需使用浏览器翻译插件，请确保其处于“中文”模式以避免冲突。');
        } else {
            // 切换到英文时：禁止谷歌翻译，避免干扰
            htmlEl.translate = 'no';
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
            const bars = this.querySelectorAll('.bar');
            if (bars.length >= 3) {
                bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
                bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
                bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
            }
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle?.querySelectorAll('.bar');
                if (bars && bars.length >= 3) {
                    bars[0].style.transform = bars[2].style.transform = 'none';
                    bars[1].style.opacity = '1';
                }
            }
        });
    });
});

// 3. 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(10, 14, 23, 0.95)' : 'rgba(10, 14, 23, 0.9)';
        navbar.style.backdropFilter = window.scrollY > 50 ? 'blur(10px)' : 'none';
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
        
        if (!email || !email.includes('@')) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = '#f87171';
            return;
        }
        
        formMessage.textContent = 'Thank you! You have been subscribed.';
        formMessage.style.color = '#4ade80';
        emailInput.value = '';
        
        setTimeout(() => { formMessage.textContent = ''; }, 3000);
    });
}

// 5. 任务中心核心功能 (仅限 tasks.html)
document.addEventListener('DOMContentLoaded', function() {
    const isTasksPage = window.location.pathname.includes('tasks.html') || document.querySelector('.task-center-container');
    if (!isTasksPage) return;

    console.log('Initializing Task Center...');
    
    // 任务数据（部分文本支持双语）
    const mockTasks = [
        {
            id: 1,
            title: { en: "Design FairVerse Social Media Banner", zh: "设计 FairVerse 社交媒体横幅" },
            description: { en: "Create a captivating banner (1920x1080) that represents 'A Universe Built by You'.", zh: "创作一个体现'由你构筑的宇宙'理念的迷人横幅(1920x1080)。" },
            reward: { token: 800, nft: "Founder Designer NFT" },
            category: "design",
            status: "open",
            submissions: 7
        },
        {
            id: 2,
            title: { en: "Write a Tutorial: Getting Started with Godot", zh: "撰写教程：Godot入门指南" },
            description: { en: "Write a beginner-friendly guide on using Godot to create your first FairVerse asset.", zh: "撰写一篇关于使用Godot创建您的第一个FairVerse资产的入门指南。" },
            reward: { token: 500, nft: null },
            category: "content",
            status: "open",
            submissions: 3
        },
        {
            id: 3,
            title: { en: "Community Growth Challenge", zh: "社区成长挑战" },
            description: { en: "Invite new verified members to our Discord and help them get started.", zh: "邀请新的已验证成员加入我们的Discord并帮助他们入门。" },
            reward: { token: 1200, nft: "Community Pioneer NFT" },
            category: "outreach",
            status: "open",
            submissions: 18
        }
    ];

    const taskList = document.getElementById('taskList');
    const connectBtn = document.getElementById('connectWalletBtn');
    const rewardFilter = document.getElementById('rewardFilter');
    const myTasksList = document.getElementById('myTasksList');
    
    let isWalletConnected = false;
    let userAcceptedTasks = JSON.parse(localStorage.getItem('fairverse_user_tasks')) || [];
    
    // 获取当前语言
    const currentLang = localStorage.getItem('fairverse-lang') || 'en';
    
    function renderTasks(tasks = mockTasks) {
        if (!taskList) return;
        taskList.innerHTML = tasks.map(task => {
            const title = task.title[currentLang] || task.title.en;
            const desc = task.description[currentLang] || task.description.en;
            return `
                <div class="task-card">
                    <span class="task-category">${task.category}</span>
                    <h3>${title}</h3>
                    <p>${desc}</p >
                    <div class="reward">
                        <div class="reward-token">${task.reward.token} <span translate="no">$H</span></div>
                        ${task.reward.nft ? `<div class="reward-nft">+ ${task.reward.nft}</div>` : ''}
                        <div style="margin-left:auto; font-size:0.9rem; color:#94a3b8;"><i>Submissions: ${task.submissions}</i></div>
                    </div>
                    <button class="claim-btn" onclick="claimTask(${task.id})" ${!isWalletConnected ? 'disabled' : ''}>
                        ${!isWalletConnected ? '🔒 Connect Wallet First' : '🚀 Accept Task'}
                    </button>
                </div>
            `;
        }).join('');
    }
    
    function renderUserTasks() {
        if (!myTasksList) return;
        if (userAcceptedTasks.length === 0) {
            myTasksList.innerHTML = '<p class="empty-state">No tasks accepted yet. Connect wallet and accept a task!</p >';
            return;
        }
        myTasksList.innerHTML = userAcceptedTasks.map(taskId => {
            const task = mockTasks.find(t => t.id === taskId);
            if (!task) return '';
            const title = task.title[currentLang] || task.title.en;
            return `<div class="user-task-item"><strong>${title}</strong><small>Status: <span class="status-pending">Pending Submission</span></small></div>`;
        }).join('');
    }
    
    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            if (isWalletConnected) return;
            this.innerHTML = '<span class="spinner"></span> Connecting...';
            this.disabled = true;
            setTimeout(() => {
                isWalletConnected = true;
                this.innerHTML = '✅ Wallet Connected (<span translate="no">0x7f3...c42</span>)';
                this.classList.add('connected');
                document.querySelectorAll('.claim-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.textContent = '🚀 Accept Task';
                });
                renderUserTasks();
                showNotification('Wallet connected successfully!', 'success');
            }, 800);
        });
    }
    
    if (rewardFilter) {
        rewardFilter.addEventListener('change', function() {
            const val = this.value;
            let filtered = [...mockTasks];
            if (val === 'token') filtered = mockTasks.filter(task => !task.reward.nft);
            if (val === 'nft') filtered = mockTasks.filter(task => task.reward.nft);
            renderTasks(filtered);
        });
    }
    
    window.claimTask = function(taskId) {
        if (!isWalletConnected) { showNotification('Please connect your wallet first!', 'error'); return; }
        if (userAcceptedTasks.includes(taskId)) { showNotification('You have already accepted this task!', 'warning'); return; }
        userAcceptedTasks.push(taskId);
        localStorage.setItem('fairverse_user_tasks', JSON.stringify(userAcceptedTasks));
        const task = mockTasks.find(t => t.id === taskId);
        if (task) task.submissions += 1;
        showNotification(`Task #${taskId} accepted!<br><br><strong>Next Steps:</strong><br>1. Join our <a href=" " target="_blank" style="color:#a5b4fc;">Discord</a ><br>2. Submit work in <strong>#task-submissions</strong><br>3. Get reviewed & receive rewards`, 'success', 8000);
        renderUserTasks();
        renderTasks();
    };
    
    function showNotification(msg, type = 'info', duration = 5000) {
        const existing = document.querySelector('.global-notification');
        if (existing) existing.remove();
        const notification = document.createElement('div');
        notification.className = `global-notification notification-${type}`;
        notification.innerHTML = `<div class="notification-content">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}<span>${msg}</span></div><button class="notification-close">&times;</button>`;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        if (duration > 0) setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
    
    // 注入通知样式
    const style = document.createElement('style');
    style.textContent = `.global-notification{position:fixed;top:20px;right:20px;background:rgba(30,41,59,0.95);backdrop-filter:blur(10px);border-left:4px solid #3b82f6;border-radius:12px;padding:16px 20px;color:white;max-width:400px;box-shadow:0 10px 30px rgba(0,0,0,0.3);transform:translateX(150%);transition:transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);z-index:10000;display:flex;align-items:center;justify-content:space-between;}.global-notification.show{transform:translateX(0);}.notification-success{border-color:#10b981;}.notification-error{border-color:#f87171;}.notification-warning{border-color:#fbbf24;}.notification-content{display:flex;align-items:flex-start;gap:12px;font-size:0.95rem;line-height:1.5;}.notification-content a{color:#a5b4fc;text-decoration:underline;}.notification-close{background:none;border:none;color:#94a3b8;font-size:1.5rem;cursor:pointer;padding:0 0 0 15px;line-height:1;}.notification-close:hover{color:white;} .spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 0.8s linear infinite;margin-right:8px;vertical-align:middle;}@keyframes spin{to{transform:rotate(360deg);}}.user-task-item{background:rgba(255,255,255,0.05);padding:12px;border-radius:8px;margin-bottom:10px;border-left:3px solid #8b5cf6;}.user-task-item strong{display:block;color:#e2e8f0;margin-bottom:5px;font-size:0.95rem;}.user-task-item small{color:#94a3b8;font-size:0.85rem;}.status-pending{color:#fbbf24;font-weight:600;}`;
    document.head.appendChild(style);
    
    renderTasks();
    renderUserTasks();
    if (userAcceptedTasks.length > 0) {
        isWalletConnected = true;
        if (connectBtn) {
            connectBtn.innerHTML = '✅ Wallet Connected (<span translate="no">0x7f3...c42</span>)';
            connectBtn.classList.add('connected');
        }
        renderUserTasks();
    }
});