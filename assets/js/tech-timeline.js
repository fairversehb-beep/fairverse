// 技术演化路径数据
const timelineData = [
    {
        year: "Now - 2025",
        title: "Open Creation Era",
        icon: "🛠️",
        desc: "Build worlds with open-source engines (Godot/Unity) & AI tools. Democratizing 3D creation.",
        tech: ["Godot Engine", "Unity", "AI-Assisted Design", "3D Modeling"]
    },
    {
        year: "2025 - 2026",
        title: "Full Immersion",
        icon: "🥽",
        desc: "Seamless VR/AR integration via OpenXR. Work, socialize, and play in truly immersive spaces.",
        tech: ["OpenXR", "Standalone VR", "Spatial Computing", "Haptic Feedback"]
    },
    {
        year: "2027 - 2028",
        title: "Mind Interface (Phase 1)",
        icon: "🧠",
        desc: "Integrate non-invasive BCI (EEG) for basic control, meditation, and focus-enhanced experiences.",
        tech: ["EEG BCI", "Neuro-Feedback", "Mindful Training", "Neuralink API"]
    },
    {
        year: "2030+",
        title: "Consensus Reality",
        icon: "🌌",
        desc: "Advanced BCI research for seamless thought-to-action and shared virtual consciousness.",
        tech: ["Next-gen BCI", "Sensory Fusion", "Decentralized Consciousness"]
    }
];

// 初始化技术时间轴
function initTechTimeline() {
    const container = document.getElementById('techTimeline');
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 创建时间轴项目
    timelineData.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const itemEl = document.createElement('div');
        itemEl.className = `timeline-item ${isLeft ? 'left' : 'right'}`;
        itemEl.style.opacity = '0';
        itemEl.style.transform = 'translateY(30px)';
        
        itemEl.innerHTML = `
            <div class="timeline-dot">${item.icon}</div>
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p >
                <div class="tech-tags">
                    ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });

    // 使用 GSAP 动画（确保已引入GSAP库）
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
        // 如果GSAP未加载，使用简单淡入
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

// 导出函数供全局使用
window.initTechTimeline = initTechTimeline;