import type {
  CareerPresetConfig,
  CareerPresetKey,
  ProjectNarrativeLabels,
  RoleKey,
  RoleNarrative,
  ThemeKey,
  ThemeConfig,
} from '../types/portfolio'

/**
 * 四种岗位叙事。同一份真实项目内容，按目标岗位重组表达：
 * 首屏文案、章节标题、方法步骤、项目叙事标签都随岗位切换。
 */
export const roleNarratives = {
  designer: {
    id: 'designer',
    name: '设计师',
    audience: '视觉、品牌与创意岗位',
    defaultTheme: 'studio',
    descriptor: 'AI 内容 · 视觉 · 工作流',
    heroTitle: {
      fullText: '把 AI 能力，做成看得见的设计与内容。',
      prefix: '把 ',
      accent: 'AI',
      suffix: ' 能力，做成看得见的设计与内容。',
    },
    heroDescription: [
      'AI 辅助的视觉与内容设计实践。',
      '从概念到交付，保留可编辑的源文件。',
    ],
    about: [
      '我相信好的设计始于清晰的问题。围绕品牌视觉、界面体验与内容设计工作，习惯把每一次交付都沉淀为可复用的方法与规范。',
      '工具会变，判断不会。AI 让探索的成本变低，而最终的品质仍取决于打磨的颗粒度。',
    ],
    workSectionTitle: '精选作品',
    processSectionTitle: '我如何工作',
    capabilitiesSectionTitle: '能力与工具',
    contactHeading: '如果你在找一个能把 AI 真正做成结果的人，我们可以聊聊。',
    process: [
      { index: '01', title: '需求拆解', description: '把目标与约束拆成可验证的问题' },
      { index: '02', title: '概念方向', description: '快速给出多个可比较的方向' },
      { index: '03', title: '设计制作', description: '小步试做，逐轮校正细节' },
      { index: '04', title: '交付复盘', description: '保留源文件与复盘记录' },
    ],
    projectNarrativeLabels: { context: '项目背景', role: '我的职责', process: '设计方法', outcome: '成果' },
  },
  film: {
    id: 'film',
    name: '影视制作',
    audience: '导演、剪辑、制片与视频岗位',
    defaultTheme: 'cinema',
    descriptor: 'AI 影像 · 短剧 · 后期',
    heroTitle: {
      fullText: '用 AI 工作流，做出能交付的影像。',
      prefix: '用 ',
      accent: 'AI 工作流',
      suffix: '，做出能交付的影像。',
    },
    heroDescription: [
      'AI 短剧与视频内容的策划、制作与质控。',
      '每一版都保留可修改的工程文件。',
    ],
    about: [
      '我专注影像的完整链路：从分镜到成片，从素材管理到质量控制。可编辑的工程文件和可复用的流程，与画面本身一样重要。',
      'AI 让影像制作的门槛变低，而观众的耐心没有变多，所以每一秒都要经得起回看。',
    ],
    workSectionTitle: '作品与项目',
    processSectionTitle: '制作流程',
    capabilitiesSectionTitle: '制作能力',
    contactHeading: '如果你有影像或短剧项目需要落地，我们可以聊聊。',
    process: [
      { index: '01', title: '立项与分镜', description: '把故事拆成可制作的镜头清单' },
      { index: '02', title: '素材生成', description: '按分镜生成与筛选可用素材' },
      { index: '03', title: '剪辑与质控', description: '可编辑剪辑，机器与人工双重校验' },
      { index: '04', title: '交付存档', description: '成片、工程与素材库一并交付' },
    ],
    projectNarrativeLabels: { context: '项目背景', role: '担任职务', process: '制作过程', outcome: '交付成果' },
  },
  product: {
    id: 'product',
    name: '产品经理',
    audience: '产品、项目与用户研究岗位',
    defaultTheme: 'product',
    descriptor: 'AI 产品 · 工作流 · 决策',
    heroTitle: {
      fullText: '把模糊的 AI 需求，收敛成能落地的方案。',
      prefix: '把模糊的 ',
      accent: 'AI 需求',
      suffix: '，收敛成能落地的方案。',
    },
    heroDescription: [
      '从问题定义到交付复盘的产品实践。',
      '用证据和约束做决策，而不是凭感觉。',
    ],
    about: [
      '我习惯从模糊的需求出发，把问题定义清楚再动手。关注约束、证据与取舍，把每一次决策的依据记录下来，让方案经得起复盘。',
      'AI 是放大器：方向对了事半功倍，方向错了只会更快地走错路。',
    ],
    workSectionTitle: '产品案例',
    processSectionTitle: '我如何推进',
    capabilitiesSectionTitle: '能力矩阵',
    contactHeading: '如果你需要一个能把模糊需求做成方案的人，我们可以聊聊。',
    process: [
      { index: '01', title: '洞察与定义', description: '把模糊诉求收敛成清晰的问题' },
      { index: '02', title: '方案与取舍', description: '在约束中比较方案并做出取舍' },
      { index: '03', title: '推进与验证', description: '小步落地，用证据验证假设' },
      { index: '04', title: '复盘与迭代', description: '记录决策依据，持续修正' },
    ],
    projectNarrativeLabels: { context: '背景', role: '我的决策', process: '取舍', outcome: '影响' },
  },
  operations: {
    id: 'operations',
    name: '内容运营',
    audience: '内容、品牌、市场与运营岗位',
    defaultTheme: 'editorial',
    descriptor: '内容 · 增长 · 复盘',
    heroTitle: {
      fullText: '让内容系统，持续产生可复用的结果。',
      prefix: '让 ',
      accent: '内容系统',
      suffix: '，持续产生可复用的结果。',
    },
    heroDescription: [
      '选题、制作、发布与数据复盘的完整闭环。',
      '每一篇内容都沉淀为可复用的资产。',
    ],
    about: [
      '我把内容当作长期资产来经营：选题、制作、发布、复盘，每一步都留下可复用的沉淀。比起单次的爆发，我更在意持续稳定的增长。',
      '数据用来说明问题，而不是装饰成绩。投放带来的部分，我会单独标注。',
    ],
    workSectionTitle: '内容与项目',
    processSectionTitle: '运营方法',
    capabilitiesSectionTitle: '能力范围',
    contactHeading: '如果你在找一个能把内容做成系统的人，我们可以聊聊。',
    process: [
      { index: '01', title: '选题与定位', description: '从读者与数据出发确定方向' },
      { index: '02', title: '制作与包装', description: '标题、结构与视觉的一体化打磨' },
      { index: '03', title: '发布与推广', description: '分渠道发布并记录投放细节' },
      { index: '04', title: '数据与复盘', description: '扣除投放看真实表现，沉淀方法' },
    ],
    projectNarrativeLabels: { context: '目标', role: '策略', process: '执行', outcome: '结果' },
  },
} as const satisfies Record<RoleKey, RoleNarrative>

export const roleKeys = ['designer', 'film', 'product', 'operations'] as const satisfies readonly RoleKey[]

/** 旧的 build-time 职业预设键映射到运行时岗位键。 */
export const careerToRole = {
  studio: 'designer',
  cinema: 'film',
  product: 'product',
  editorial: 'operations',
} as const satisfies Record<CareerPresetKey, RoleKey>

export const careerPresetNarratives = {
  studio: {
    context: 'Brief',
    role: 'My role',
    process: 'System',
    outcome: 'Outcome',
  },
  cinema: {
    context: 'Treatment',
    role: 'Credits',
    process: 'Cut',
    outcome: 'Delivery',
  },
  product: {
    context: 'Context',
    role: 'Decision',
    process: 'Tradeoff',
    outcome: 'Impact',
  },
  editorial: {
    context: 'Goal',
    role: 'Strategy',
    process: 'Execution',
    outcome: 'Result',
  },
} as const satisfies Record<CareerPresetKey, ProjectNarrativeLabels>

export const careerPresets = {
  studio: {
    id: 'studio',
    name: '创意工作室',
    audience: '设计师、创意岗位与自由职业者',
    projectNarrativeLabels: careerPresetNarratives.studio,
  },
  cinema: {
    id: 'cinema',
    name: '影视制作',
    audience: '导演、剪辑、制片与视频内容岗位',
    projectNarrativeLabels: careerPresetNarratives.cinema,
  },
  product: {
    id: 'product',
    name: '产品案例',
    audience: '产品经理、用户研究与项目岗位',
    projectNarrativeLabels: careerPresetNarratives.product,
  },
  editorial: {
    id: 'editorial',
    name: '内容运营',
    audience: '内容、品牌、市场与运营岗位',
    projectNarrativeLabels: careerPresetNarratives.editorial,
  },
} as const satisfies Record<CareerPresetKey, CareerPresetConfig>

type ThemePreset = Omit<ThemeConfig, 'careerPreset'>

export const themePresets = {
  studio: {
    id: 'studio',
    name: '冷白工作室',
    description: '冷白画廊、近黑文字与 ultramarine 强调，配合响应式动态排版。',
    colorMode: 'light',
    layoutStyle: 'gallery',
    motionStyle: 'kinetic',
    tokens: {
      background: '#f4f6f8',
      surface: '#ffffff',
      text: '#090b10',
      mutedText: '#59616d',
      accent: '#2447f9',
      accentText: '#ffffff',
      border: '#d6dce5',
      displayFont: '"Space Grotesk", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      bodyFont: '"IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      radius: '2px',
      shadow: '0 24px 70px rgba(9, 11, 16, 0.14)',
    },
  },
  cinema: {
    id: 'cinema',
    name: '石墨片场',
    description: 'graphite 底色、silver 文字与 chartreuse 强调，配合克制的 frame wipe。',
    colorMode: 'dark',
    layoutStyle: 'cinematic',
    motionStyle: 'frame-wipe',
    tokens: {
      background: '#0b1013',
      surface: '#151c20',
      text: '#d7dce0',
      mutedText: '#929ba1',
      accent: '#c8d63c',
      accentText: '#0a0e0a',
      border: '#364047',
      displayFont: '"Manrope", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      bodyFont: '"IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      radius: '0px',
      shadow: '0 28px 90px rgba(0, 0, 0, 0.48)',
    },
  },
  product: {
    id: 'product',
    name: '冷银产品',
    description: 'cool silver 底色、charcoal 信息层级与 deep emerald 决策路径。',
    colorMode: 'light',
    layoutStyle: 'system',
    motionStyle: 'decision-path',
    tokens: {
      background: '#eef2f3',
      surface: '#ffffff',
      text: '#17201f',
      mutedText: '#5d6966',
      accent: '#09664f',
      accentText: '#ffffff',
      border: '#cdd7d4',
      displayFont: '"IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      bodyFont: '"IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      radius: '8px',
      shadow: '0 18px 50px rgba(23, 32, 31, 0.10)',
    },
  },
  editorial: {
    id: 'editorial',
    name: '纸上编辑部',
    description: 'true paper white、ink 与 burnt orange，配合杂志式 page mask。',
    colorMode: 'light',
    layoutStyle: 'magazine',
    motionStyle: 'page-mask',
    tokens: {
      background: '#ffffff',
      surface: '#faf8f3',
      text: '#171411',
      mutedText: '#6d655d',
      accent: '#c54a16',
      accentText: '#ffffff',
      border: '#d9d2c8',
      displayFont: '"Noto Serif SC Variable", "Source Serif 4", "Noto Serif SC", "Songti SC", STSong, SimSun, serif',
      bodyFont: '"Source Sans 3", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      radius: '0px',
      shadow: '0 16px 46px rgba(48, 39, 31, 0.10)',
    },
  },
} as const satisfies Record<ThemeKey, ThemePreset>
