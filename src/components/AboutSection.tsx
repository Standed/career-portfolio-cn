import type { EducationEntry, ManagedField, WorkHistoryEntry } from '../types/portfolio'
import { Reveal } from './Reveal'

type AboutSectionProps = {
  id: string
  title: string
  bio: readonly string[]
  targetRole: ManagedField<string>
  workHistory: ManagedField<readonly WorkHistoryEntry[]>
  education: ManagedField<readonly EducationEntry[]>
}

export function AboutSection({ id, title, bio, targetRole, workHistory, education }: AboutSectionProps) {
  const showWork = workHistory.status === 'verified' && workHistory.value.length > 0
  const showEducation = education.status === 'verified' && education.value.length > 0
  const showTimeline = showWork || showEducation

  return (
    <section className="about-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell about-grid">
        <div className="about-main">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          {bio.map((paragraph, index) => (
            <Reveal delay={0.06 + index * 0.06} key={paragraph.slice(0, 12)}>
              <p className="about-paragraph">{paragraph}</p>
            </Reveal>
          ))}
          {targetRole.status === 'verified' ? (
            <p className="about-target">
              <span className="about-target-label">目标方向</span>
              {targetRole.value}
            </p>
          ) : null}
        </div>

        {showTimeline ? (
          <div className="about-timeline">
            {showWork ? (
              <Reveal delay={0.1}>
                <ol className="about-history">
                  {workHistory.status === 'verified' ? workHistory.value.map((entry) => (
                    <li key={`${entry.organization}-${entry.period}`}>
                      <span className="about-period">{entry.period}</span>
                      <div>
                        <h3>{entry.title}</h3>
                        <p className="about-org">{entry.organization}</p>
                        <p className="about-note">{entry.summary}</p>
                      </div>
                    </li>
                  )) : null}
                </ol>
              </Reveal>
            ) : null}
            {showEducation ? (
              <Reveal delay={0.14}>
                <ol className="about-history about-education">
                  {education.status === 'verified' ? education.value.map((entry) => (
                    <li key={`${entry.institution}-${entry.period}`}>
                      <span className="about-period">{entry.period}</span>
                      <div>
                        <h3>{entry.institution}</h3>
                        <p className="about-org">{entry.program}</p>
                      </div>
                    </li>
                  )) : null}
                </ol>
              </Reveal>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
