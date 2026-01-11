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
    
    // 点击“EN”按钮显示/隐藏下拉菜单
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
            langCodeSpan.textContent = selectedLang.toUpperCase();
            
            // 更新页面所有文本
            updatePageLanguage(selectedLang);
            
            // 隐藏下拉菜单
            langDropdown.classList.remove('show');
        });
    });
    
    // 点击页面其他地方时关闭下拉菜单
    document.addEventListener('click', function() {
        langDropdown.classList.remove('show');
    });
    
    // 阻止下拉菜单内部的点击事件冒泡（防止触发document的点击事件）
    langDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 核心函数：更新页面文本内容
    function updatePageLanguage(lang) {
        // 更新所有带有 data-en 和 data-zh 属性的元素
        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.getAttribute('data-zh');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        });
        
        // 更新按钮文字（针对有 data-en/data-zh 的按钮）
        document.querySelectorAll('.btn[data-en]').forEach(btn => {
            if (lang === 'zh') {
                btn.textContent = btn.getAttribute('data-zh');
            } else {
                btn.textContent = btn.getAttribute('data-en');
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

// 2. 导航栏移动端响应式菜单（如果之前没有的话）
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 切换汉堡菜单动画
            const bars = this.querySelectorAll('.bar');
            bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });
    }
    
    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // 重置汉堡菜单动画
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
});

// 3. 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
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