/**
 * FairVerse 官網 JavaScript
 * 處理導航、表單提交、滾動效果等交互功能
 */

(function() {
    'use strict';

    // ============================================
    // DOM 元素初始化
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');

    // ============================================
    // 導航欄滾動效果
    // ============================================
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 添加滾動後樣式
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // 移動端漢堡菜單切換
    // ============================================
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // 點擊導航鏈接後關閉菜單
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // 點擊外部區域關閉菜單
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ============================================
    // 平滑滾動到錨點
    // ============================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只處理錨點鏈接
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // 活動導航鏈接高亮
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNav() {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);

    // ============================================
    // 郵箱訂閱表單處理
    // ============================================
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // 簡單的郵箱驗證
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showFormMessage('請輸入電子郵件地址', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showFormMessage('請輸入有效的電子郵件地址', 'error');
                return;
            }
            
            // 模擬表單提交（實際應用中應該發送到服務器）
            showFormMessage('正在提交...', '');
            
            // 模擬 API 請求延遲
            setTimeout(() => {
                // 這裡應該替換為實際的 API 調用
                // 例如：fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
                
                showFormMessage('感謝您的訂閱！我們會儘快與您聯繫。', 'success');
                emailInput.value = '';
                
                // 3秒後清除消息
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 3000);
            }, 1000);
        });
    }

    /**
     * 顯示表單消息
     * @param {string} message - 要顯示的消息
     * @param {string} type - 消息類型：'success' 或 'error'
     */
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        if (type) {
            formMessage.classList.add(type);
        }
    }

    // ============================================
    // 滾動動畫（Intersection Observer）
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll(
        '.comparison-card, .tech-card, .economy-feature, .timeline-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ============================================
    // 頁面加載完成後的初始化
    // ============================================
    window.addEventListener('DOMContentLoaded', function() {
        // 設置初始導航高亮
        highlightActiveNav();
        
        // 如果有哈希錨點，滾動到對應位置
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });

    // ============================================
    // 視窗大小改變時的處理
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // 在桌面視圖時關閉移動端菜單
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }, 250);
    });

})();