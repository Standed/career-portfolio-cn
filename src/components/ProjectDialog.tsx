import { X } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import type { ManagedField, ProjectEntry, ProjectNarrativeLabels } from '../types/portfolio'

type ProjectDialogProps = {
  project: ProjectEntry | null
  pendingLabel: string
  narrativeLabels: ProjectNarrativeLabels
  onClose: () => void
}

function PendingMessage({ field, label }: { field: ManagedField<unknown>; label: string }) {
  if (field.status === 'verified') return null
  return <p className="pending-note">{label}</p>
}

export function ProjectDialog({ project, pendingLabel, narrativeLabels, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const canShowDetails = project?.visibility === 'full' && project.publication.status === 'verified'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    if (!project) {
      if (dialog.open) dialog.close()
      return undefined
    }

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (!dialog.open) dialog.showModal()
    const focusFrame = window.requestAnimationFrame(() => {
      dialog.querySelector<HTMLButtonElement>('.dialog-close')?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      const trigger = triggerRef.current
      window.requestAnimationFrame(() => trigger?.focus())
    }
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby={project ? `dialog-title-${project.slug}` : undefined}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      {project ? (
        <div className="dialog-shell">
          <header className="dialog-header">
            <div>
              <h2 id={`dialog-title-${project.slug}`}>{project.title}</h2>
              <p>{project.category}</p>
            </div>
            <button className="dialog-close" type="button" aria-label="关闭项目详情" onClick={onClose}>
              <X size={22} aria-hidden="true" />
            </button>
          </header>

          <div className="dialog-body">
            <div>
              <section className="dialog-section" aria-labelledby={`overview-${project.slug}`}>
                <h3 className="dialog-label" id={`overview-${project.slug}`}>{narrativeLabels.context}</h3>
                <p>{project.summary}</p>
              </section>

              {canShowDetails ? (
                <>
                  <section className="dialog-section" aria-labelledby={`role-${project.slug}`}>
                    <h3 className="dialog-label" id={`role-${project.slug}`}>{narrativeLabels.role}</h3>
                    {project.role.status === 'verified' ? <p>{project.role.value}</p> : <PendingMessage field={project.role} label={pendingLabel} />}
                  </section>

                  <section className="dialog-section" aria-labelledby={`deliverables-${project.slug}`}>
                    <h3 className="dialog-label" id={`deliverables-${project.slug}`}>交付物</h3>
                    {project.deliverables.status === 'verified' ? (
                      <ul className="dialog-list">
                        {project.deliverables.value.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : (
                      <PendingMessage field={project.deliverables} label={pendingLabel} />
                    )}
                  </section>

                  {project.evidence.length > 0 ? (
                    <section className="dialog-section" aria-labelledby={`evidence-${project.slug}`}>
                      <h3 className="dialog-label" id={`evidence-${project.slug}`}>已核验证据</h3>
                      <ul className="dialog-list">
                        {project.evidence.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  ) : null}

                  <section className="dialog-section" aria-labelledby={`outcome-${project.slug}`}>
                    <h3 className="dialog-label" id={`outcome-${project.slug}`}>{narrativeLabels.outcome}</h3>
                    {project.outcome.status === 'verified' ? <p>{project.outcome.value}</p> : <PendingMessage field={project.outcome} label={pendingLabel} />}
                  </section>
                </>
              ) : (
                <section className="dialog-section" aria-labelledby={`summary-boundary-${project.slug}`}>
                  <h3 className="dialog-label" id={`summary-boundary-${project.slug}`}>公开说明</h3>
                  <p className="pending-note">完整项目细节与素材尚未确认可公开，本页只保留概况和当前状态。</p>
                </section>
              )}
            </div>

            <aside>
              <section className="dialog-section" aria-labelledby={`status-${project.slug}`}>
                <h3 className="dialog-label" id={`status-${project.slug}`}>当前状态</h3>
                <p>{project.statusLabel}</p>
              </section>

              <section className="dialog-section" aria-labelledby={`publication-${project.slug}`}>
                <h3 className="dialog-label" id={`publication-${project.slug}`}>公开边界</h3>
                {project.publication.status === 'verified' ? (
                  <p>项目内容已确认可公开。</p>
                ) : (
                  <PendingMessage field={project.publication} label={pendingLabel} />
                )}
              </section>

              {canShowDetails ? (
                <section className="dialog-section" aria-labelledby={`metrics-${project.slug}`}>
                  <h3 className="dialog-label" id={`metrics-${project.slug}`}>量化结果</h3>
                  {project.metrics.status === 'verified' ? (
                    project.metrics.value.map((metric) => (
                      <div className="dialog-metric" key={`${metric.label}-${metric.value}`}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}，{metric.context}</span>
                      </div>
                    ))
                  ) : (
                    <PendingMessage field={project.metrics} label={pendingLabel} />
                  )}
                </section>
              ) : null}
            </aside>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
