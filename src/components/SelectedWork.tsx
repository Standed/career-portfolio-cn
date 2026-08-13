import { ArrowRight } from '@phosphor-icons/react'
import { useState } from 'react'
import type { ProjectEntry, ProjectNarrativeLabels, ThemeKey } from '../types/portfolio'
import { ProjectDialog } from './ProjectDialog'
import { Reveal } from './Reveal'
import { SpotlightArticle } from './SpotlightArticle'
import { TiltCard } from './TiltCard'

type SelectedWorkProps = {
  theme: ThemeKey
  id: string
  title: string
  pendingLabel: string
  narrativeLabels: ProjectNarrativeLabels
  projects: readonly ProjectEntry[]
}

function DetailButton({ project, onOpen }: { project: ProjectEntry; onOpen: (project: ProjectEntry) => void }) {
  return (
    <button className="project-action text-link" type="button" aria-haspopup="dialog" onClick={() => onOpen(project)}>
      查看详情
      <ArrowRight size={19} weight="regular" aria-hidden="true" />
    </button>
  )
}

function ProjectImage({ project }: { project: ProjectEntry }) {
  const media = project.media[0]
  if (!media) return null
  return <figure className="project-media"><img src={media.src} alt={media.alt} loading="lazy" /></figure>
}

type SectionProps = Omit<SelectedWorkProps, 'theme'> & { onOpen: (project: ProjectEntry) => void }

function StudioWork({ id, title, projects, onOpen }: SectionProps) {
  return (
    <section className="work-section studio-work" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal variant="blur"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="studio-work-list">
          {projects.map((project, index) => (
            <Reveal delay={index * 0.06} key={project.slug}>
              <SpotlightArticle className="studio-project-row">
                <span className="project-index" aria-hidden="true">{project.index}</span>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-status">{project.statusLabel}</p>
                </div>
                <DetailButton project={project} onOpen={onOpen} />
              </SpotlightArticle>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CinemaWork({ id, title, projects, onOpen }: SectionProps) {
  return (
    <section className="work-section cinema-work" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal variant="blur"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="cinema-work-list">
          {projects.map((project, index) => (
            <Reveal className={index === 0 ? 'cinema-slate cinema-slate-lead' : 'cinema-slate'} delay={index * 0.05} variant="wipe" key={project.slug}>
              <TiltCard>
                <p className="cinema-slate-meta">
                  <span className="project-category">{project.category}</span>
                  <span>{project.statusLabel}</span>
                </p>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <DetailButton project={project} onOpen={onOpen} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductWork({ id, title, projects, onOpen }: SectionProps) {
  return (
    <section className="work-section product-work" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal variant="blur"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="product-case-list">
          {projects.map((project, index) => (
            <Reveal delay={index * 0.05} key={project.slug}>
              <TiltCard className="product-case">
                <div className="product-case-rail">
                  <span className="project-index">{project.index}</span>
                  <p className="project-category">{project.category}</p>
                  <p className="project-status">{project.statusLabel}</p>
                </div>
                <div className="product-case-main">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  {project.visibility === 'full' && project.publication.status === 'verified' && project.evidence.length > 0 ? (
                    <div className="case-evidence">
                      <strong>已核验证据</strong>
                      <ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  ) : null}
                </div>
                <div className="product-case-action">
                  <DetailButton project={project} onOpen={onOpen} />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function EditorialWork({ id, title, projects, onOpen }: SectionProps) {
  return (
    <section className="work-section editorial-work" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal className="editorial-work-head" variant="blur"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="editorial-work-grid">
          <nav className="editorial-index" aria-label="作品索引">
            <ol>
              {projects.map((project) => (
                <li key={project.slug}>
                  <a href={`#project-${project.slug}`}>
                    <span className="toc-index">{project.index}</span>
                    {project.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="editorial-projects">
            {projects.map((project, index) => (
              <Reveal delay={index * 0.04} variant="mask" key={project.slug}>
                <article className="editorial-project" id={`project-${project.slug}`}>
                  <p className="project-category">{project.category}</p>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ProjectImage project={project} />
                  <div className="editorial-project-footer">
                    <ul className="project-tags" aria-label="项目范围">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                    <DetailButton project={project} onOpen={onOpen} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SelectedWork({ theme, ...rest }: SelectedWorkProps) {
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null)

  const dialog = (
    <ProjectDialog
      project={activeProject}
      pendingLabel={rest.pendingLabel}
      narrativeLabels={rest.narrativeLabels}
      onClose={() => setActiveProject(null)}
    />
  )

  return (
    <>
      {theme === 'cinema' ? <CinemaWork {...rest} onOpen={setActiveProject} /> : null}
      {theme === 'product' ? <ProductWork {...rest} onOpen={setActiveProject} /> : null}
      {theme === 'editorial' ? <EditorialWork {...rest} onOpen={setActiveProject} /> : null}
      {theme === 'studio' ? <StudioWork {...rest} onOpen={setActiveProject} /> : null}
      {dialog}
    </>
  )
}
