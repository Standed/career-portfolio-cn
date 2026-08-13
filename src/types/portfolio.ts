export type VerificationStatus = 'verified' | 'pending'

export type CareerPresetKey = 'studio' | 'cinema' | 'product' | 'editorial'

export type ThemeKey = CareerPresetKey

export type RoleKey = 'designer' | 'film' | 'product' | 'operations'

export type HeroTitleCopy = {
  readonly fullText: string
  readonly prefix: string
  readonly accent: string
  readonly suffix: string
}

export type RoleNarrative = {
  readonly id: RoleKey
  readonly name: string
  readonly audience: string
  readonly defaultTheme: ThemeKey
  readonly descriptor: string
  readonly heroTitle: HeroTitleCopy
  readonly heroDescription: readonly string[]
  readonly about: readonly string[]
  readonly workSectionTitle: string
  readonly processSectionTitle: string
  readonly capabilitiesSectionTitle: string
  readonly contactHeading: string
  readonly process: readonly ProcessStep[]
  readonly projectNarrativeLabels: ProjectNarrativeLabels
}

export type ProjectNarrativeLabels = {
  readonly context: string
  readonly role: string
  readonly process: string
  readonly outcome: string
}

export type CareerPresetConfig = {
  readonly id: CareerPresetKey
  readonly name: string
  readonly audience: string
  readonly projectNarrativeLabels: ProjectNarrativeLabels
}

export type ThemeTokens = {
  readonly background: string
  readonly surface: string
  readonly text: string
  readonly mutedText: string
  readonly accent: string
  readonly accentText: string
  readonly border: string
  readonly displayFont: string
  readonly bodyFont: string
  readonly radius: string
  readonly shadow: string
}

export type ThemeConfig = {
  readonly id: ThemeKey
  readonly careerPreset: CareerPresetKey
  readonly name: string
  readonly description: string
  readonly colorMode: 'dark' | 'light'
  readonly layoutStyle: 'gallery' | 'cinematic' | 'system' | 'magazine'
  readonly motionStyle: 'kinetic' | 'frame-wipe' | 'decision-path' | 'page-mask'
  readonly tokens: ThemeTokens
}

export type VerifiedField<T> = {
  readonly status: 'verified'
  readonly value: T
  readonly sourceNote?: string
}

export type PendingField = {
  readonly status: 'pending'
  readonly value: null
  readonly prompt: string
}

export type ManagedField<T> = VerifiedField<T> | PendingField

export type NavigationItem = {
  readonly label: string
  readonly href: `#${string}`
}

export type LinkAction = {
  readonly label: string
  readonly href: string
  readonly kind: 'anchor' | 'download' | 'external'
}

export type MediaAsset = {
  readonly src: `/${string}`
  readonly alt: string
}

export type ProjectVisibility = 'summary-only' | 'full'

export type ProjectMetric = {
  readonly label: string
  readonly value: string
  readonly context: string
}

export type ProjectEntry = {
  readonly slug: string
  readonly index: string
  readonly title: string
  readonly category: string
  readonly summary: string
  readonly statusLabel: string
  readonly detailStatus: VerificationStatus
  readonly visibility: ProjectVisibility
  readonly publication: ManagedField<'approved'>
  readonly role: ManagedField<string>
  readonly deliverables: ManagedField<readonly string[]>
  readonly evidence: readonly string[]
  readonly outcome: ManagedField<string>
  readonly metrics: ManagedField<readonly ProjectMetric[]>
  readonly media: readonly MediaAsset[]
  readonly tags: readonly string[]
}

export type ProcessStep = {
  readonly index: string
  readonly title: string
  readonly description: string
}

export type CapabilityGroup = {
  readonly title: string
  readonly items: readonly string[]
  readonly evidenceStatus: VerificationStatus
}

export type EducationEntry = {
  readonly institution: string
  readonly program: string
  readonly period: string
}

export type WorkHistoryEntry = {
  readonly organization: string
  readonly title: string
  readonly period: string
  readonly summary: string
}

export type ContactChannel = {
  readonly label: string
  readonly value: ManagedField<string>
  readonly href: ManagedField<string>
}

export type EditableContactChannel = {
  readonly value: string | null
  readonly href: string | null
}

export type EditableProjectEntry = {
  readonly slug: string
  readonly index: string
  readonly title: string
  readonly category: string
  readonly summary: string
  readonly statusLabel: string
  readonly detailsVerified: boolean
  readonly publicationApproved: true | null
  readonly role: string | null
  readonly deliverables: readonly string[] | null
  readonly evidence: readonly string[]
  readonly outcome: string | null
  readonly metrics: readonly ProjectMetric[] | null
  readonly media: readonly MediaAsset[]
  readonly tags: readonly string[]
}

export type EditablePortfolioProfile = {
  readonly careerPreset: CareerPresetKey
  readonly theme: ThemeKey
  readonly identity: {
    readonly name: string
    readonly displayName: string
    readonly descriptor: string
  }
  readonly personal: {
    readonly realName: string | null
    readonly targetRole: string | null
    readonly education: readonly EducationEntry[] | null
    readonly workHistory: readonly WorkHistoryEntry[] | null
    readonly quantifiedOutcomes: readonly ProjectMetric[] | null
  }
  readonly hero: {
    readonly title: {
      readonly fullText: string
      readonly prefix: string
      readonly accent: string
      readonly suffix: string
    }
    readonly description: readonly string[]
  }
  readonly projects: readonly EditableProjectEntry[]
  readonly process: readonly ProcessStep[]
  readonly capabilities: readonly CapabilityGroup[]
  readonly resumePath: string | null
  readonly contact: {
    readonly heading: string
    readonly fallback: string
    readonly email: EditableContactChannel
    readonly wechat: EditableContactChannel
    readonly github: EditableContactChannel
  }
  readonly seo: {
    readonly description: string
    readonly siteUrl: string | null
  }
}

export type PortfolioContent = {
  readonly meta: {
    readonly schemaVersion: 1
    readonly lastReviewed: string
    readonly contentStatusDocument: string
  }
  readonly brand: {
    readonly name: string
    readonly displayName: string
    readonly descriptor: string
  }
  readonly career: CareerPresetConfig
  readonly theme: ThemeConfig
  readonly projectNarrativeLabels: ProjectNarrativeLabels
  readonly profile: {
    readonly realName: ManagedField<string>
    readonly targetRole: ManagedField<string>
    readonly education: ManagedField<readonly EducationEntry[]>
    readonly workHistory: ManagedField<readonly WorkHistoryEntry[]>
    readonly quantifiedOutcomes: ManagedField<readonly ProjectMetric[]>
  }
  readonly navigation: readonly NavigationItem[]
  readonly hero: {
    readonly title: {
      readonly fullText: string
      readonly prefix: string
      readonly accent: string
      readonly suffix: string
    }
    readonly description: readonly string[]
    readonly primaryAction: LinkAction
    readonly media: MediaAsset
  }
  readonly projectsSection: {
    readonly id: 'work'
    readonly title: string
    readonly pendingLabel: string
  }
  readonly projects: readonly ProjectEntry[]
  readonly processSection: {
    readonly id: 'process'
    readonly title: string
    readonly media: MediaAsset
  }
  readonly process: readonly ProcessStep[]
  readonly capabilitiesSection: {
    readonly id: 'capabilities'
    readonly title: string
  }
  readonly capabilities: readonly CapabilityGroup[]
  readonly resume: {
    readonly label: string
    readonly download: ManagedField<string>
    readonly fileName: string
    readonly behaviorWhenPending: 'hide'
  }
  readonly contact: {
    readonly id: 'contact'
    readonly heading: string
    readonly fallback: string
    readonly action: ManagedField<LinkAction>
    readonly channels: {
      readonly email: ContactChannel
      readonly wechat: ContactChannel
      readonly github: ContactChannel
    }
    readonly media: MediaAsset
  }
  readonly footer: {
    readonly brand: string
    readonly descriptor: string
  }
  readonly seo: {
    readonly title: string
    readonly description: string
    readonly locale: 'zh_CN'
    readonly canonicalPath: '/'
    readonly siteUrl: ManagedField<string>
    readonly ogImage: MediaAsset
    readonly ogType: 'website'
    readonly twitterCard: 'summary_large_image'
  }
}
