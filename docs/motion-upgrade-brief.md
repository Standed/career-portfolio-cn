# 动效升级任务书（参考 motionsites.ai 美学，保持四主题个性）

项目：C:\Users\Owner\Documents\New project\portfolio-site（React + Vite + motion@12 + lenis）。
你此前已为这个项目做过四主题重写，本次在它的基础上加一层高级动效。

## 目标

把站点从"干净的排版模板"推到"有动效记忆点的高级作品集"，参考 motionsites.ai 这类
高端动效站的手法：极光动态背景、鼠标聚光灯、3D 倾斜、光泽扫过、呼吸光晕。
但每个主题保持自己的克制个性，不要堆成廉价特效合集。

## 要做的七件事

1. **主题动态背景系统**（新建 src/components/AmbientBackground.tsx，挂进 App，fixed 定位、z-index 低于内容、pointer-events:none）
   - studio：冷白底上两团 accent 色系径向渐变（blur 70-90px），transform 缓慢漂移，约 50-60s 一个循环，opacity 0.5 以内
   - cinema：深色底上一道 accent 色光束以极慢速度扫过（translateX 循环 40s+），叠加在现有颗粒之下
   - product：浅色底柔和细网格 + 一团极淡翠绿光晕缓慢呼吸
   - editorial：不放背景动效，保持纸面纯净
   只用 transform/opacity 做动画，不用 top/left/width。

2. **鼠标跟随聚光灯**：studio 的 .studio-project-row、product 的 .product-case、cinema 的 .cinema-slate
   上加径向渐变光斑跟随鼠标。实现：容器监听 pointermove，把坐标写入 CSS 变量
   --spot-x / --spot-y（requestAnimationFrame 节流），::before 用 radial-gradient at var(--spot-x) var(--spot-y)，
   hover 才显现，离开淡出。做一个可复用的 hook（src/components/useSpotlight.ts）。

3. **3D 倾斜卡片**：product 的 .product-case 与 cinema 的 .cinema-slate hover 时轻微
   3D 透视倾斜（rotateX/rotateY 绝对值 ≤ 4°，离开弹簧回正）。新建 src/components/TiltCard.tsx
   （motion 的 useMotionValue + useSpring，perspective 1000px）。studio 行式列表保持平面。

4. **Hero 强调词光泽扫过**：.accent-text 增加 background: linear-gradient 的 shine sweep
   （background-clip: text，一道亮带 3.5s 扫过一次，幅度克制），四个主题都生效但 editorial 用墨色光泽。

5. **主按钮呼吸光晕**：.button-primary 常态下有非常柔和的 accent 外发光（box-shadow 低透明度），
   hover 时光晕增强，与现有黑色滑块填充共存。

6. **章节标题入场升级**：.section-heading 的 Reveal 入场从单纯上升改为 blur(10px)→0 + y 上升，
   一次性动画（in-view 触发），注意只用于标题元素避免大面积 filter 动画。

7. **Hero 图片边框流光**：.media-frame 与 .cinema-process-media 的边框上，一道 accent 渐变沿边框
   缓慢流动（可用 conic-gradient + CSS @property --angle 旋转，或 background-position 动画，
   选择兼容性好的方式；不支持 @property 的环境静默降级为静态边框）。

## 硬性约束

- 不改 src/content/、src/types/ 数据模型；不虚构任何内容
- 保留全部现有动效（kinetic title、parallax、自定义光标、磁吸按钮、跑马灯、Lenis）
- prefers-reduced-motion 时所有新动效完全静止（CSS 用媒体查询，JS 用 useReducedMotion）
- 1536 / 1280 / 768 / 390 / 320 五档宽度零横向溢出
- 页面可见文本保持全中文（不允许出现装饰性英文）
- npm run lint、npm run build、npm run release:check 必须全绿
- 性能：背景层只用 transform/opacity；will-change 只加在真正持续动画的元素上

## 自查要求

完成后起 dev server（端口 5199），用 playwright 截四个主题的 hero 与滚动中段各一张，
自己检查：背景不抢内容、文字可读、无生硬闪烁。把截图放到 output/motion-v2/。
