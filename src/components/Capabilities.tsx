import { Camera, Cube, PencilLine, TreeStructure } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { CapabilityGroup, MediaAsset, ThemeKey } from '../types/portfolio'
import { Reveal } from './Reveal'

const capabilityIcons: readonly Icon[] = [PencilLine, Camera, Cube, TreeStructure]

type CapabilitiesProps = {
  theme: ThemeKey
  id: string
  title: string
  groups: readonly CapabilityGroup[]
  media: MediaAsset
}

export function Capabilities({ theme, id, title, groups, media }: CapabilitiesProps) {
  return (
    <section className={`capabilities-section ${theme}-capabilities`} id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell capabilities-shell">
        <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="capabilities-composition">
          <Reveal className="capabilities-media" delay={0.06}>
            <img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" />
          </Reveal>
          <div className="capabilities-list">
            {groups.map((group, index) => {
              const CapabilityIcon = capabilityIcons[index % capabilityIcons.length]
              return (
                <Reveal className="capability-item" delay={index * 0.04} key={group.title}>
                  <article>
                    <CapabilityIcon className="capability-icon" size={28} weight="regular" aria-hidden="true" />
                    <h3>{group.title}</h3>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
