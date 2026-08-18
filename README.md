# 遥感建模论坛（RSMF）网站

纯静态站点，托管于 GitHub Pages，域名 [rsmodeling.org](https://rsmodeling.org/)。

## 本地预览

在仓库根目录执行：

```bash
python -m http.server 8000
```

浏览器打开 `http://localhost:8000`。请使用本地服务器预览，不要直接双击 HTML（根路径 `/assets/...` 在 `file://` 下会失效）。

## 新增一届通知

1. 复制 `notices/2026-no1.html` 为 `notices/YYYY-noN.html`，替换正文。
2. 在 `notices.html` 卡片列表顶部加一条。
3. 如需出现在首页「最新通知」，改 `index.html`。
4. 如属于某一届，在 `forums/YYYY.html` 的通知列表中加一条。
