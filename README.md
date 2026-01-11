# FairVerse 官網

公平公開的虛擬世界平台官方網站 - 基於 FairVerse 白皮書設計的現代科技公司官網首頁。

## 📋 專案概述

這是一個現代化、響應式的單頁面網站，採用深色太空主題和霓虹藍紫色調，體現未來感和高級感。網站展示了 FairVerse 平台的核心願景、技術特色、經濟模型和發展路線圖。

## 🎨 設計特色

- **深色太空主題**：深色背景配合星空動畫效果
- **霓虹藍紫色調**：使用靛藍、紫色和青色構建現代科技感
- **現代無襯線字體**：採用 Inter 字體，清晰易讀
- **響應式設計**：完美適配桌面、平板和手機設備
- **流暢動畫效果**：滾動動畫、懸停效果和過渡動畫

## 📁 文件結構

```
fairvesehb/
│
├── index.html              # 主頁面文件
├── assets/
│   ├── css/
│   │   └── style.css      # 樣式表文件
│   └── js/
│       └── script.js      # JavaScript 腳本文件
└── README.md              # 本說明文件
```

## 🚀 快速開始

### 方式一：直接打開

1. 克隆或下載此專案到本地
2. 直接雙擊打開 `index.html` 文件即可在瀏覽器中查看

### 方式二：使用本地服務器（推薦）

為了獲得最佳體驗和避免 CORS 問題，建議使用本地服務器運行：

#### 使用 Python（推薦）

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然後在瀏覽器中訪問：`http://localhost:8000`

#### 使用 Node.js (http-server)

```bash
# 安裝 http-server（如果尚未安裝）
npm install -g http-server

# 在專案目錄運行
http-server -p 8000
```

#### 使用 VS Code Live Server

1. 在 VS Code 中安裝 "Live Server" 擴展
2. 右鍵點擊 `index.html`
3. 選擇 "Open with Live Server"

## 📱 功能特色

### 1. 導航欄
- 固定頂部導航，滾動時自動調整樣式
- 平滑滾動到對應區塊
- 移動端響應式漢堡菜單
- 活動鏈接自動高亮

### 2. 英雄區（Hero Section）
- 全屏展示核心標語
- 動態星空背景
- 漸變文字效果
- 滾動指示動畫

### 3. 問題與解決方案對比
- 傳統中心化平台 vs FairVerse 去中心化平台
- 清晰的優劣對比展示

### 4. 核心技術展示
- 四個核心技術圖標卡片
- 懸停動畫效果
- 響應式網格布局

### 5. 經濟模式
- 三個核心經濟特色展示
- 漸變數字標識

### 6. 發展路線圖
- 時間線樣式展示
- 三個主要發展階段

### 7. 郵箱訂閱
- 表單驗證
- 成功/錯誤消息提示
- 模擬提交處理（需替換為實際 API）

### 8. 頁腳
- Discord 和 X (Twitter) 社交鏈接
- 快速導航鏈接
- 版權信息

## 🔧 自定義配置

### 修改社交媒體鏈接

在 `index.html` 中修改頁腳部分的社交鏈接：

```html
<a href="https://discord.gg/fairverse" ...>
<a href="https://twitter.com/fairverse" ...>
```

### 修改顏色主題

在 `assets/css/style.css` 的 `:root` 變量中修改：

```css
:root {
    --color-primary: #6366f1;    /* 主色 */
    --color-secondary: #8b5cf6;  /* 次色 */
    --color-accent: #06b6d4;     /* 強調色 */
    /* ... 更多顏色變量 */
}
```

### 集成實際的郵箱訂閱 API

在 `assets/js/script.js` 中找到郵箱表單提交處理部分，替換模擬請求為實際 API 調用：

```javascript
// 替換此部分
setTimeout(() => {
    // 實際 API 調用
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        showFormMessage('感謝您的訂閱！', 'success');
    })
    .catch(error => {
        showFormMessage('訂閱失敗，請稍後再試。', 'error');
    });
}, 1000);
```

## 🌐 瀏覽器兼容性

- Chrome（最新版本）✅
- Firefox（最新版本）✅
- Safari（最新版本）✅
- Edge（最新版本）✅
- 移動端瀏覽器 ✅

## 📝 技術棧

- **HTML5**：語義化標籤
- **CSS3**：現代 CSS 特性（Grid、Flexbox、變量、動畫）
- **JavaScript (ES6+)**：原生 JavaScript，無依賴
- **Google Fonts**：Inter 字體

## 🔒 性能優化建議

1. **圖片優化**：如果未來添加圖片，請使用 WebP 格式並提供備用方案
2. **字體優化**：已使用 `preconnect` 優化字體加載
3. **代碼壓縮**：生產環境建議壓縮 CSS 和 JavaScript
4. **CDN 部署**：建議部署到 CDN 以提升全球訪問速度

## 📄 許可證

版權所有 © 2024 FairVerse。保留所有權利。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request。

## 📧 聯繫方式

- Discord: [FairVerse Discord](https://discord.gg/fairverse)
- X (Twitter): [@fairverse](https://twitter.com/fairverse)

---

**注意**：這是一個演示網站。在實際部署前，請確保：
1. 替換所有社交媒體鏈接為實際鏈接
2. 集成實際的郵箱訂閱後端 API
3. 添加隱私政策和服務條款（如適用）
4. 進行 SEO 優化（meta 標籤、結構化數據等）
5. 添加網站分析工具（如 Google Analytics）