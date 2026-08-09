import type { EditablePortfolioProfile } from '../types/portfolio'

/**
 * 唯一需要优先编辑的内容文件。
 *
 * 非技术用户只需修改引号中的文字，或把 null 换成真实内容。
 * 没有确认的信息继续保留 null，页面会自动隐藏，不能填写示例数据。
 */
export const profileConfig = {
  // EDIT HERE 1: 职业叙事与视觉主题，可独立选择四种预设。
  careerPreset: 'studio',
  theme: 'studio',

  // EDIT HERE 2: 品牌与展示名称。整站名称都从这里派生。
  identity: {
    name: '西羊石AI视频',
    displayName: '西羊石',
    descriptor: 'AI Content & Video',
  },

  // EDIT HERE 3: 个人资料。未确认时保留 null。
  personal: {
    realName: null,
    targetRole: null,
    education: null,
    workHistory: null,
    quantifiedOutcomes: null,
  },

  // EDIT HERE 4: 首屏介绍。prefix、accent、suffix 用于高亮排版。
  hero: {
    title: {
      fullText: '把复杂的 AI 能力，做成能交付的内容与影像。',
      prefix: '把复杂的 ',
      accent: 'AI',
      suffix: ' 能力，做成能交付的内容与影像。',
    },
    description: [
      'AI 内容策划、视频制作与工作流设计。',
      '关注真实结果，也保留人的判断。',
    ],
  },

  // EDIT HERE 5: 项目。没有证据的数据填 null，不要估算。
  projects: [
    {
      slug: 'dengying-shaonian',
      index: '01',
      title: '灯影少年',
      category: 'AI 短剧制作系统',
      summary:
        '围绕 AI 短剧建立分镜、素材、可编辑剪辑与 QC 记录。现有本地审核版成片，整片人工复核和公开授权仍待确认。',
      statusLabel: '本地成片与机器 QC 已核验',
      detailsVerified: true,
      publicationApproved: null,
      role: null,
      deliverables: ['本地审核版成片', '机器 QC 报告', '可编辑剪辑工程'],
      evidence: [
        '本地审核版成片已导出',
        '机器级时间线回读与画面抽检已完成',
        '整片人工观看与试听仍待完成',
      ],
      outcome: null,
      metrics: null,
      media: [],
      tags: ['策划', '制作', '交付'],
    },
    {
      slug: 'content-knowledge-base',
      index: '02',
      title: '内容知识库',
      category: 'Obsidian × AI',
      summary:
        '围绕资料整理、结构化、检索与复用的内容系统实践。项目边界、个人职责、交付物和结果待确认。',
      statusLabel: '项目详情待确认',
      detailsVerified: false,
      publicationApproved: null,
      role: null,
      deliverables: null,
      evidence: [],
      outcome: null,
      metrics: null,
      media: [],
      tags: ['策划', '制作', '交付'],
    },
    {
      slug: 'video-asset-library',
      index: '03',
      title: '视频素材库',
      category: '数据驱动迭代',
      summary:
        '围绕素材整理、筛选、复用与发布反馈的工作流。项目边界、个人职责、交付物和结果待确认。',
      statusLabel: '项目详情待确认',
      detailsVerified: false,
      publicationApproved: null,
      role: null,
      deliverables: null,
      evidence: [],
      outcome: null,
      metrics: null,
      media: [],
      tags: ['策划', '制作', '交付'],
    },
  ],

  // EDIT HERE 6: 工作方法与能力。用自己能举证的表述替换。
  process: [
    {
      index: '01',
      title: '问题定义',
      description: '把目标与约束拆成可验证的问题',
    },
    {
      index: '02',
      title: '证据与素材',
      description: '建立来源、版本与授权边界',
    },
    {
      index: '03',
      title: '制作与验证',
      description: '小步试做，逐轮校正',
    },
    {
      index: '04',
      title: '交付与复盘',
      description: '保留可编辑成果与复盘记录',
    },
  ],
  capabilities: [
    {
      title: '选题与写作',
      items: ['聚焦与洞察', '选题策划', '结构与脚本', '文案与叙事'],
      evidenceStatus: 'verified',
    },
    {
      title: 'AI 视频制作',
      items: ['分镜与脚本可视化', '素材生成与筛选', '剪辑与调色', '声音与合成'],
      evidenceStatus: 'verified',
    },
    {
      title: '知识系统',
      items: ['资料整理与结构化', '知识建模与检索', '检索与复用', '协作与沉淀'],
      evidenceStatus: 'verified',
    },
    {
      title: '自动化工作流',
      items: ['流程设计', '工具与集成', '自动化执行', '监控与优化'],
      evidenceStatus: 'verified',
    },
  ],

  // EDIT HERE 7: 简历路径。文件未放入 public/resume 前保留 null。
  resumePath: null,

  // EDIT HERE 8: 联系方式。value 是展示文字，href 是完整链接。
  contact: {
    heading: '如果你在找一个能把 AI 真正做成结果的人，我们可以聊聊。',
    fallback: '联系方式正在补充中，当前可先查看项目与制作方法。',
    email: { value: null, href: null },
    wechat: { value: null, href: null },
    github: { value: null, href: null },
  },

  // EDIT HERE 9: 正式域名确认后再填写 siteUrl。
  seo: {
    description:
      '中文作品集，展示 AI 短剧、内容知识库与视频素材工作流，以及从问题定义到交付复盘的制作方法。',
    siteUrl: 'https://standed.github.io/career-portfolio-cn/',
  },
} as const satisfies EditablePortfolioProfile

export default profileConfig
