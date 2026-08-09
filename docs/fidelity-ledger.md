# 四主题视觉还原与验收账本

更新时间：2026-08-10

## 对照材料

设计目标：

- `design/concepts/v2/studio-overview-v2.png`
- `design/concepts/v2/cinema-overview-v2.png`
- `design/concepts/v2/product-overview-v2.png`
- `design/concepts/v2/editorial-overview-v2.png`

最终浏览器首屏：

- `docs/previews/studio-desktop.png`
- `docs/previews/cinema-desktop.png`
- `docs/previews/product-desktop.png`
- `docs/previews/editorial-desktop.png`
- `docs/previews/*-mobile.png`

四张概念图与八张最终浏览器截图均已用 `view_image` 回读。概念图只控制设计方向，没有裁切或嵌入生产页面。

## 逐主题结论

| 主题 | 保留的设计意图 | 生产版调整 | 状态 |
| --- | --- | --- | --- |
| Studio | 冷白背景、近黑大字、ultramarine 强调、左文右图、非对称画廊 | 使用获准抽象建筑图，不使用概念中的虚构品牌书、Logo、名片和手机界面 | 通过 |
| Cinema | graphite 全幅画面、chartreuse 操作色、片格、媒体先于长文 | 没有真实视频时移除播放按钮，不使用概念中的演员、片场和虚构剧照 | 通过 |
| Product | cool silver、deep emerald、问题到交付的决策路径、证据优先 | 决策路径用真实语义 `ol/li` 重建，不使用便签、用户引语、假仪表盘或虚构指标 | 通过 |
| Editorial | paper white、burnt orange、Serif 标题、文档拼贴与文章阅读节奏 | 打包 Noto Serif SC Variable，使用获准抽象图，不把概念中的报表和附件当成真实成果 | 通过 |

## 八项视觉检查

1. 构图差异

   四套主题的 Hero、项目区和流程区都使用不同 React composition。Studio 是画廊，Cinema 是画面和片格，Product 是决策路径，Editorial 是栏目和文章结构。它们不再是一套 DOM 只换配色。

2. 信息层级

   首屏都保留品牌、职业定位、主标题、两行说明和唯一主要行动。没有 eyebrow、状态条、滚动提示或假证明数字。项目入口在首屏可见。

3. 色彩与对比

   四套 token 与 v2 方向一致。交互焦点使用高对比轮廓，Cinema 保持暗色，Studio、Product、Editorial 保持各自单一浅色基调，页面内部不随意反转主题。

4. 中文断词与字体

   Hero 使用中文词语分段，`AI 能力`、`内容`、`影像`不会被拆成单字换行。旧浏览器没有 `Intl.Segmenter` 时使用安全回退。Editorial 的 Noto Serif SC Variable 已在浏览器中确认加载，其他主题使用中文友好的 sans 回退。

5. 媒体与权利边界

   生产页面只引用 `public/media` 的三张获准生成图。项目媒体与详细证据只有在公开状态确认后才渲染。`local-review/` 被 gitignore 和发布校验共同排除。

6. 动效一致性

   Studio 使用标题与媒体遮罩，Cinema 使用 frame wipe，Product 使用 decision path 顺序出现，Editorial 使用 page mask。没有滚动劫持、全局 scroll listener、自动音频、循环跑马灯、自定义鼠标或无意义装饰循环。

7. 响应式

   真实浏览器验证 1536x1024、390x844、320x844，以及 768 CSS 像素的 200% 缩放等效布局。四主题均满足 `scrollWidth === clientWidth`，最小交互高度 44px。多栏结构在移动端重排为单列。

8. 无障碍与发布安全

   Skip link、键盘导航、移动菜单、主题选择、原生 Dialog、关闭后焦点返回与 reduced motion 均已验证。减弱动效模式下四主题没有 opacity 0、隐藏正文或残留 clip。`npm run release:check` 只允许三张白名单媒体进入发布包。

## 与概念图的有意差异

- 概念图中的生成文字、播放按钮、时间码、用户引语、表格、指标、客户 Logo 和附件清单均未复制。
- 当前没有已授权的项目图或 Reel，因此项目区域优先呈现可信文字与公开状态，不制造假作品画面。
- 简历、联系方式、正式域名和量化结果仍为 pending，页面按安全规则隐藏。
- 全页截图在内置浏览器中会重复拼接 sticky header，因此 README 使用真实首屏截图。全页结构由浏览器 DOM、交互、响应式指标和分段检查共同验收。

## 最终结论

四套实现达到 v2 的职业识别和视觉方向，同时删除了概念图中无法核验的内容。当前差异来自真实性、授权和可访问性约束，不是未完成的视觉还原。
