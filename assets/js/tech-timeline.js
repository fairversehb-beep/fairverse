// assets/js/tech-timeline.js - 技术路径时间轴 (双语支持版)

// 技术演化路径数据 (支持双语)
const timelineData = [
    {
        year: { en: "Now - 2025", zh: "现在 - 2025年" },
        title: { en: "Open Creation Era", zh: "开源创造时代" },
        icon: "🛠️",
        description: { 
            en: "Build worlds with open-source engines (Godot/Unity) & AI tools. Democratizing 3D creation.", 
            zh: "使用开源引擎(Godot/Unity)与AI工具构建世界。让3D创造大众化。" 
        },
        tech: ["Godot Engine", "Unity", "AI-Assisted Design", "3D Modeling"]
    },
    {
        year: { en: "2025 - 2026", zh: "2025 - 2026年" },
        title: { en: "Full Immersion", zh: "完全沉浸" },
        icon: "🥽",
        description: { 
            en: "Seamless VR/AR integration via OpenXR. Work, socialize, and play in truly immersive spaces.", 
            zh: "通过OpenXR实现无缝VR/AR集成。在真正沉浸的空间中工作、社交和娱乐。" 
        },
        tech: ["OpenXR", "Standalone VR", "Spatial Computing", "Haptic Feedback"]
    },
    {
        year: { en: "2027 - 2028", zh: "2027 - 2028年" },
        title: { en: "Mind Interface (Phase 1)", zh: "思维接口 (第一阶段)" },
        icon: "🧠",
        description: { 
            en: "Integrate non-invasive BCI (EEG) for basic control, meditation, and focus-enhanced experiences.", 
            zh: "集成非侵入式脑机接口(EEG)，实现基础控制、冥想和增强专注力的体验。" 
        },
        tech: ["EEG BCI", "Neuro-Feedback", "Mindful Training", "Neuralink API"]
    },
    {
        year: { en: "2030+", zh: "2030年+" },
        title: { en: "Consensus Reality", zh: "共识现实" },
        icon: "🌌",
        description: { 
            en: "Advanced BCI research for seamless thought-to-action and shared virtual consciousness.", 
            zh: "研究高级脑机接口，实现无缝的思行合一与共享虚拟意识。" 
        },
        tech: ["Next-gen BCI", "Sensory Fusion", "Decentralized Consciousness"]
    }
];

function initTechTimeline() {
    const container = document.getElementById('techTimeline');
    if (!container) return;

    // 获取当前语言
    const currentLang = localStorage.getItem('fairverse-lang') || 'en';
    
    // 清空容器
    container.innerHTML = '';

    // 创建时间轴项目
    timelineData.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const itemEl = document.createElement('div');
        itemEl.className = `timeline-item ${isLeft ? 'left' : 'right'}`;
        itemEl.style.opacity = '0';
        itemEl.style.transform = 'translateY(30px)';
        
        // 根据当前语言选择文本
        const year = item.year[currentLang] || item.year.en;
        const title = item.title[currentLang] || item.title.en;
        const description = item.description[currentLang] || item.description.en;
        
        itemEl.innerHTML = `
            <div class="timeline-dot">${item.icon}</div>
            <div class="timeline-content">
                <div class="timeline-year">${year}</div>
                <h3>${title}</h3>
                <p>${description}</p >
                <div class="tech-tags">
                    ${item.tech.map(t => `<span class="tech-tag" translate="no">${t}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });

    // 使用 GSAP 动画
    if (typeof gsap !== 'undefined') {
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    } else {
        // 备用动画
        document.querySelectorAll('.timeline-item').forEach((item, i) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }, i * 150);
        });
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechTimeline);
} else {
    initTechTimeline();
}

// 监听语言切换事件（当其他脚本切换语言时，重绘时间轴）
document.addEventListener('languageChanged', function(e) {
    initTechTimeline();
});

// 导出函数供全局使用
window.initTechTimeline = initTechTimeline;