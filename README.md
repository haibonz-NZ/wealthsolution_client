# WealthSolution Client (GWRC Phase 1 - GitHub Pages)

自定义域：`wealthsolution-client.theonefo.com`

## 开发
- `npm ci`
- `npm run dev`

## 构建与导出
- `npm run build`
- `npm run export`（输出到 `out/` 目录）

## 部署（GitHub Actions 自动）
- push 到 `main` → Actions 构建并发布到 GitHub Pages
- Pages 设置中勾选 Enforce HTTPS

## TODO（后续迭代）
- P03 身份地图拖拽交互与国家逻辑弹窗
- P06 风险列表与RAG解释对接后端API
- 匿名会话与隐私盾中间件联调
