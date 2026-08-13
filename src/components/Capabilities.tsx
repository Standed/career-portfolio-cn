import type { CapabilityGroup, ThemeKey } from '../types/portfolio'
import { Reveal } from './Reveal'

type CapabilitiesProps = {
  theme: ThemeKey
  id: string
  title: string
  groups: readonly CapabilityGroup[]
}

const gridClassByTheme: Record<ThemeKey, string> = {
  studio: 'studio-capability-cols',
  cinema: 'cinema-capability-matrix',
  product: 'product-capability-grid',
  editorial: 'editorial-capability-cols',
}

export function Capabilities({ theme, id, title, groups }: CapabilitiesProps) {
  return (
    <section className={`capabilities-section ${theme}-capabilities`} id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal variant="blur"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className={gridClassByTheme[theme]}>
          {groups.map((group, index) => (
            <Reveal className="capability-item" delay={index * 0.05} key={group.title}>
              <article>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
