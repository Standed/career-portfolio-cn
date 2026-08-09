import type {
  EditableContactChannel,
  EditablePortfolioProfile,
  LinkAction,
  ManagedField,
  PortfolioContent,
  VerifiedField,
} from '../types/portfolio'
import { profileConfig } from './profile'
import {
  careerPresets,
  themePresets,
} from './presets'

export { careerPresetNarratives, careerPresets, themePresets } from './presets'

const contentSource: EditablePortfolioProfile = profileConfig
const selectedCareer = careerPresets[contentSource.careerPreset]
const selectedTheme = themePresets[contentSource.theme]

const verified = <T>(value: T, sourceNote?: string): VerifiedField<T> => ({
  status: 'verified',
  value,
  ...(sourceNote ? { sourceNote } : {}),
})

const pending = <T>(prompt: string): ManagedField<T> => ({
  status: 'pending',
  value: null,
  prompt,
})

const managed = <T>(
  value: T | null,
  prompt: string,
  sourceNote?: string,
): ManagedField<T> =>
  value === null ? pending<T>(prompt) : verified(value, sourceNote)

const makeChannel = (
  label: string,
  channel: EditableContactChannel,
  valuePrompt: string,
  hrefPrompt: string,
) => ({
  label,
  value: managed(channel.value, valuePrompt),
  href: managed(channel.href, hrefPrompt),
})

export const isVerifiedField = <T>(
  field: ManagedField<T>,
): field is VerifiedField<T> => field.status === 'verified'

const firstContact = [
  contentSource.contact.email,
  contentSource.contact.wechat,
  contentSource.contact.github,
].find(
  (channel): channel is { readonly value: string; readonly href: string } =>
    channel.value !== null && channel.href !== null,
)

const contactAction: ManagedField<LinkAction> = firstContact
  ? verified({
      label: '联系我',
      href: firstContact.href,
      kind: 'external',
    })
  : pending('补充并核验至少一种公开联系方式后开启联系按钮。')

export const portfolioContent = {
  meta: {
    schemaVersion: 1,
    lastReviewed: '2026-08-10',
    contentStatusDocument: '/docs/content-status.md',
  },
  brand: contentSource.identity,
  career: selectedCareer,
  theme: {
    ...selectedTheme,
    careerPreset: contentSource.careerPreset,
  },
  projectNarrativeLabels: selectedCareer.projectNarrativeLabels,
  profile: {
    realName: managed(
      contentSource.personal.realName,
      '补充对外使用的真实姓名，并确认是否公开。',
    ),
    targetRole: managed(
      contentSource.personal.targetRole,
      '补充目标岗位或希望承接的工作方向。',
    ),
    education: managed(
      contentSource.personal.education,
      '补充教育经历，并逐项确认学校、专业和时间。',
    ),
    workHistory: managed(
      contentSource.personal.workHistory,
      '补充工作经历，并逐项确认单位、职责和时间。',
    ),
    quantifiedOutcomes: managed(
      contentSource.personal.quantifiedOutcomes,
      '补充经过核验的项目数据、业务结果和统计口径。',
    ),
  },
  navigation: [
    { label: '作品', href: '#work' },
    { label: '方法', href: '#process' },
    { label: '能力', href: '#capabilities' },
    { label: '联系', href: '#contact' },
  ],
  hero: {
    title: contentSource.hero.title,
    description: contentSource.hero.description,
    primaryAction: {
      label: '查看作品',
      href: '#work',
      kind: 'anchor',
    },
    media: {
      src: '/media/hero-architecture.webp',
      alt: '暗色建筑空间中，一束黄绿色天光从门廊照入',
    },
  },
  projectsSection: {
    id: 'work',
    title: '精选作品',
    pendingLabel: '项目细节待确认',
  },
  projects: contentSource.projects.map((project) => ({
    slug: project.slug,
    index: project.index,
    title: project.title,
    category: project.category,
    summary: project.summary,
    statusLabel: project.statusLabel,
    detailStatus: project.detailsVerified ? 'verified' : 'pending',
    visibility:
      project.detailsVerified && project.publicationApproved === true
        ? 'full'
        : 'summary-only',
    publication:
      project.publicationApproved === true
        ? verified<'approved'>('approved', '发布范围已确认。')
        : pending<'approved'>('项目公开授权范围待确认。'),
    role: managed(
      project.role,
      '具体职责待确认。',
    ),
    deliverables: managed(
      project.deliverables,
      '交付内容待确认。',
      project.deliverables
        ? '本地项目记录已核验，未随站点公开原始文件。'
        : undefined,
    ),
    evidence: project.evidence,
    outcome: managed(
      project.outcome,
      '结果与采用情况待确认。',
    ),
    metrics: managed(
      project.metrics,
      '量化结果待确认。',
    ),
    media: project.publicationApproved === true ? project.media : [],
    tags: project.tags,
  })),
  processSection: {
    id: 'process',
    title: '我如何工作',
    media: {
      src: '/media/workflow-still-life.webp',
      alt: '胶片、笔记与流程图组成的深色工作台',
    },
  },
  process: contentSource.process,
  capabilitiesSection: {
    id: 'capabilities',
    title: '内容、影像与系统',
  },
  capabilities: contentSource.capabilities,
  resume: {
    label: '下载简历',
    download: managed(
      contentSource.resumePath,
      '将已确认的简历 PDF 放入 public/resume/resume.pdf 后再开启下载。',
    ),
    fileName: 'resume.pdf',
    behaviorWhenPending: 'hide',
  },
  contact: {
    id: 'contact',
    heading: contentSource.contact.heading,
    fallback: contentSource.contact.fallback,
    action: contactAction,
    channels: {
      email: makeChannel(
        '邮箱',
        contentSource.contact.email,
        '补充公开邮箱。',
        '补充与公开邮箱一致的 mailto 链接。',
      ),
      wechat: makeChannel(
        '微信',
        contentSource.contact.wechat,
        '补充可公开的微信号或联系说明。',
        '如有公开落地页，补充对应链接。',
      ),
      github: makeChannel(
        'GitHub',
        contentSource.contact.github,
        '补充公开的 GitHub 用户名。',
        '补充对应的 GitHub 主页链接。',
      ),
    },
    media: {
      src: '/media/contact-light-seam.webp',
      alt: '暗色空间中的黄绿色竖向光缝',
    },
  },
  footer: {
    brand: contentSource.identity.displayName,
    descriptor: contentSource.identity.descriptor,
  },
  seo: {
    title: `${contentSource.identity.name}｜AI 内容与影像作品集`,
    description: contentSource.seo.description,
    locale: 'zh_CN',
    canonicalPath: '/',
    siteUrl: managed(
      contentSource.seo.siteUrl,
      'Vercel 正式域名确认后补充完整站点地址。',
    ),
    ogImage: {
      src: '/media/hero-architecture.webp',
      alt: `${contentSource.identity.name}作品集的建筑光影主视觉`,
    },
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
} as const satisfies PortfolioContent

export default portfolioContent
