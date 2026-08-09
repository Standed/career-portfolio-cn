# Portfolio Site 媒体资产清单

更新时间：2026-08-10（Asia/Shanghai）

> `public/media/` 现已只保留 3 张允许开源与线上部署的生成素材，Vite 构建不会再复制受限样例。8 张受限文件已保留并移动到 `local-review/media/`；该目录仅供本地审阅，**不得提交到公开仓库或进入发布包**。

## 开源与上线发布门禁

| 文件范围 | 开源仓库可包含 | 线上部署可用 | 发行前动作 |
| --- | --- | --- | --- |
| `public/media/hero-architecture.webp`、`public/media/workflow-still-life.webp`、`public/media/contact-light-seam.webp` | **是** | **是** | 可保留；继续保留原始生成文件与生成记录。 |
| `local-review/media/hero-world-concept.webp`、`local-review/media/project-storyboard-25shots.webp`、`local-review/media/project-character-*.webp` | **否** | **否** | 仅本地示例；公开仓库需排除整个 `local-review/`，上线时用明确可再分发的新视觉替换。 |
| `local-review/media/trailer-poster.webp` | **否** | **否** | 未确认预告片单帧的公开与再分发授权；不得提交或部署，只能换成已授权海报。 |
| `local-review/media/project-worldcup-before.webp`、`local-review/media/project-worldcup-after.webp` | **否** | **否** | 含明显第三方权利要素；不得进入公开仓库或部署包。 |

因此，`public/media/` 已是仅含 3 个“是/是”文件的 release-safe 站点媒体目录；但公开整个源码仓库前仍须确认 `local-review/` 未被提交或打包。旧视觉再设计后，应重新更新授权清单。

## 公开使用分级

- **可进入开源仓库并部署**：本次专门生成的 3 张生产素材，无文字、无真实人物、无个人数据；已明确可用于公开作品集。
- **仅本地示例，上线前须替换**：《灯影少年》项目素材与预告片单帧。项目真实性可核验，但本次没有独立的公开、再分发授权或生成素材商业来源证明。
- **禁止进入公开仓库或部署包**：世界杯前后帧，包含近景真人形象、赛事转播图层、队徽/赛事标识等第三方权利要素。

## 可进入开源仓库的生产素材

| 输出 | 原始来源 | 建议用途 | 输出规格 | 暂时公开 | 风险与边界 |
| --- | --- | --- | --- | --- | --- |
| `/media/hero-architecture.webp` | `C:\Users\Owner\.codex\generated_images\019fe7ed-117c-77f2-9e75-069a83422f00\exec-c6fac50d-e655-4750-ae8c-e0b480e70569.png` | 首页 Hero | 1536×1024，85,994 B | **是** | 专门生成、无文字和个人数据；保留原图与生成记录，正式商业发布时仍应保存所用生成服务条款快照。 |
| `/media/workflow-still-life.webp` | `C:\Users\Owner\.codex\generated_images\019fe7ed-117c-77f2-9e75-069a83422f00\exec-b50c8b20-9dab-4f59-b112-274307092e90.png` | Workflow / Process / Capabilities | 1448×1086，210,462 B | **是** | 专门生成、无可识别文字和个人数据；画面中的分镜与流程图为抽象生成元素，不应当作真实项目证据。 |
| `/media/contact-light-seam.webp` | `C:\Users\Owner\.codex\generated_images\019fe7ed-117c-77f2-9e75-069a83422f00\exec-5a807acb-5837-4c25-88e0-9cc28397ea55.png` | Contact / Footer | 1672×942，35,786 B | **是** | 专门生成、无文字和个人数据；适合作为背景氛围图，不代表具体客户场景。 |

## 待授权的《灯影少年》候选资产

| 输出 | 原始来源 | 建议用途 | 输出规格 | 暂时公开 | 风险与边界 |
| --- | --- | --- | --- | --- | --- |
| `local-review/media/hero-world-concept.webp` | `05_reference_images\world_concept_board.png` | 项目世界观概念板 / 备选 Hero | 1448×1086，283,612 B | **否，仅本地审阅** | 给定候选路径 `11_trailer_project\05_reference_images\world_concept_board.png` 不存在，已解析到工作区根目录下的真实来源；含角色、场景和中文设定，公开前需确认生成模型、参考图、字体及项目发布权。 |
| `local-review/media/project-storyboard-25shots.webp` | `02_storyboards\ep01_first_lantern\storyboard_reference_25shots.jpeg` | 分镜流程展示 | 1536×1024，397,376 B | **否，仅本地审阅** | 包含完整 25 镜剧情与中文对白，可能提前披露故事内容；公开前需确认项目发布权与生成来源。 |
| `local-review/media/project-character-shen-zhao.webp` | `03_characters\shen_zhao\shen_zhao_turnaround.png` | 角色设计 / Process | 1600×866，86,242 B | **否，仅本地审阅** | 角色设定图；公开前需确认项目发布权和生成素材商业使用范围。 |
| `local-review/media/project-character-jiang-wandeng.webp` | `03_characters\jiang_wandeng_turnaround.png` | 角色设计 / Capabilities | 1600×826，129,738 B | **否，仅本地审阅** | 角色设定图；公开前需确认项目发布权和生成素材商业使用范围。 |
| `local-review/media/project-character-aque.webp` | `03_characters\aque_paper_dog\aque_turnaround.png` | 角色设计 / Contact 备选 | 1600×900，79,546 B | **否，仅本地审阅** | 角色设定图；公开前需确认项目发布权和生成素材商业使用范围。 |
| `local-review/media/trailer-poster.webp` | `11_trailer_project\06_delivery\灯影少年_电影预告片_63s_16x9_商业修正版_v15.mp4`，约 49.0 秒单帧 | 预告片项目海报 | 1280×720，35,898 B | **否，仅本地审阅** | 单帧仍属于视频衍生素材；本次未确认预告片公开授权。没有把 63 秒视频复制进站点。 |

## 禁止公开的第三方权利候选

| 输出 | 原始来源 | 建议用途 | 输出规格 | 暂时公开 | 风险与边界 |
| --- | --- | --- | --- | --- | --- |
| `local-review/media/project-worldcup-before.webp` | `hyperframes_worldcup_before_after\media\before.mp4`，约 3.5 秒单帧 | 内部 Before/After 审阅 | 1600×900，93,358 B | **禁止** | 含近景真人形象、观众、字幕、世界杯转播图层、国家队徽与赛事标识；缺少肖像、素材、赛事和转播授权。 |
| `local-review/media/project-worldcup-after.webp` | `hyperframes_worldcup_before_after\media\after.mp4`，约 3.5 秒单帧 | 内部 Before/After 审阅 | 1600×900，94,374 B | **禁止** | 权利风险同上；静帧也无法完整证明视频级处理差异，不应用作公开效果证据。 |

## 转码与验证

- 转码：FFmpeg `libwebp`，quality 86、compression level 6、picture preset，`-map_metadata -1`。
- 尺寸：项目候选以长边 1600px 为上限；3 张公开生成素材以长边 1800px 为上限。源图低于上限时保留原生尺寸，不做放大。
- 原始文件：全部保留，未删除或覆盖；只从视频抽取单帧，没有复制视频本体。8 张受限站点副本也未删除，已从 `public/media/` 移至 `local-review/media/`。
- Pillow：移动前 11/11 文件均通过 `verify()`，随后完整 `load()` 成功；移动不改变文件内容。
- ffprobe：移动前 11/11 均识别为 WebP，尺寸与本清单一致；移动不改变文件内容。
- FFmpeg 完整解码：移动前 11/11 无报错；移动不改变文件内容。

## SHA-256

| 文件 | SHA-256 |
| --- | --- |
| `contact-light-seam.webp` | `2860055bb9d4106a0502aeaf6c54c40496dfa407f4583b55fa26db1f8a8199c8` |
| `hero-architecture.webp` | `995e14150f09725bf90f32ea1816c7c64d85a3dbff44b5bdc000fd74aeda36f0` |
| `hero-world-concept.webp` | `f9221e2ab8597178bd5a365378bd0b1fcc25d7983635cf73912787cffb8fa016` |
| `project-character-aque.webp` | `01b34ac5ad50010420e01e4fa4cafdce645339d7866994be157f90816cf4ece9` |
| `project-character-jiang-wandeng.webp` | `234b8a720cc32a9f3e9f2724a6a33988aff000d5cffb0108719cb06c1f662f06` |
| `project-character-shen-zhao.webp` | `1a489a90b971604cd14426b0aae78330455343ee2e11637625941e928918c4d2` |
| `project-storyboard-25shots.webp` | `11a6bec715dd7fe9c604ad49bdbe23b183b47ec370694c55e7ba7be3d43882ab` |
| `project-worldcup-after.webp` | `7f423c01e9450b4a4d769e50012a8ccac4a983820f19b1901f661b64eb2a51ff` |
| `project-worldcup-before.webp` | `6c34bf64ed198e642643c21966b848a758c23c98c6a1cac3d2c081450bb43f9c` |
| `trailer-poster.webp` | `c9e1d73746130848fe3b954f6aaddfb7117e94483bfc9e5efae9ae7d8b300458` |
| `workflow-still-life.webp` | `c0c7f8cc626538d35e7ef56c91c38b2bf264a681657cd9e7b49a8d577c0efd57` |
