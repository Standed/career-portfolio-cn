import { ArrowRight } from '@phosphor-icons/react'
import { useState } from 'react'
import type { ProjectEntry, ProjectNarrativeLabels, ThemeKey } from '../types/portfolio'
import { ProjectDialog } from './ProjectDialog'
import { Reveal } from './Reveal'

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
      <ArrowRight size={21} weight="regular" aria-hidden="true" />
    </button>
  )
}

function ProjectImage({ project }: { project: ProjectEntry }) {
  const media = project.media[0]
  if (!media) return null
  return <figure className="project-media"><img src={media.src} alt={media.alt} loading="lazy" /></figure>
}

export function SelectedWork({ theme, id, title, pendingLabel, narrativeLabels, projects }: SelectedWorkProps) {
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null)

  const dialog = (
    <ProjectDialog
      project={activeProject}
      pendingLabel={pendingLabel}
      narrativeLabels={narrativeLabels}
      onClose={() => setActiveProject(null)}
    />
  )

  if (theme === 'cinema') {
    return (
      <section className="work-section cinema-work" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <div className="cinema-work-grid">
            {projects.map((project, index) => (
              <Reveal className={index === 0 ? 'cinema-project cinema-project-lead' : 'cinema-project'} delay={index * 0.05} key={project.slug}>
                <article>
                  <ProjectImage project={project} />
                  <div className="cinema-project-copy">
                    <div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                      <p className="project-summary">{project.summary}</p>
                    </div>
                    <DetailButton project={project} onOpen={setActiveProject} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        {dialog}
      </section>
    )
  }

  if (theme === 'product') {
    return (
      <section className="work-section product-work" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <div className="product-case-list">
            {projects.map((project, index) => (
              <Reveal delay={index * 0.05} key={project.slug}>
                <article className="product-case">
                  <div className="product-case-main">
                    <p className="project-category">{project.category}</p>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    {project.visibility === 'full' && project.publication.status === 'verified' && project.evidence.length > 0 ? (
                      <div className="case-evidence">
                        <strong>已核验证据</strong>
                        <ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ) : <p className="case-status">{project.statusLabel}</p>}
                  </div>
                  <div className="product-case-action">
                    <DetailButton project={project} onOpen={setActiveProject} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        {dialog}
      </section>
    )
  }

  if (theme === 'editorial') {
    return (
      <section className="work-section editorial-work" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell editorial-work-grid">
          <Reveal className="editorial-index">
            <h2 className="section-heading" id={`${id}-title`}>{title}</h2>
            <ol>{projects.map((project) => <li key={project.slug}><a href={`#project-${project.slug}`}>{project.title}</a></li>)}</ol>
          </Reveal>
          <div className="editorial-projects">
            {projects.map((project, index) => (
              <Reveal delay={index * 0.04} key={project.slug}>
                <article className="editorial-project" id={`project-${project.slug}`}>
                  <header>
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                  </header>
                  <ProjectImage project={project} />
                  <p className="project-summary">{project.summary}</p>
                  <div className="editorial-project-footer">
                    <ul className="project-tags" aria-label="项目范围">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                    <DetailButton project={project} onOpen={setActiveProject} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        {dialog}
      </section>
    )
  }

  return (
    <section className="work-section studio-work" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal className="studio-work-heading"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="studio-project-grid">
          {projects.map((project, index) => (
            <Reveal className={index === 0 ? 'studio-project studio-project-lead' : 'studio-project'} delay={index * 0.04} key={project.slug}>
              <article>
                <ProjectImage project={project} />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-summary">{project.summary}</p>
                <DetailButton project={project} onOpen={setActiveProject} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      {dialog}
    </section>
  )
}
