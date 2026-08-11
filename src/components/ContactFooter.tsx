import { ArrowRight, EnvelopeSimple, GithubLogo, LinkSimple, WechatLogo } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { ContactChannel, LinkAction, ManagedField, MediaAsset } from '../types/portfolio'
import { Magnetic } from './Magnetic'
import { useParallaxY } from './Parallax'
import { Reveal } from './Reveal'

type ContactFooterProps = {
  id: string
  heading: string
  fallback: string
  action: ManagedField<LinkAction>
  channels: readonly ContactChannel[]
  media: MediaAsset
  footerBrand: string
  footerDescriptor: string
}

const channelIcons: readonly Icon[] = [EnvelopeSimple, WechatLogo, GithubLogo]

export function ContactFooter({
  id,
  heading,
  fallback,
  action,
  channels,
  media,
  footerBrand,
  footerDescriptor,
}: ContactFooterProps) {
  const publishedChannels = channels.filter(
    (channel) => channel.value.status === 'verified' && channel.href.status === 'verified',
  )
  const parallax = useParallaxY<HTMLDivElement>(7)

  return (
    <>
      <section className="contact-section" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell contact-shell">
          <div className="contact-grid">
            <Reveal className="contact-main">
              <h2 className="contact-title" id={`${id}-title`}>{heading}</h2>
              {publishedChannels.length === 0 ? <p className="contact-summary">{fallback}</p> : null}

              {action.status === 'verified' ? (
                <div className="contact-actions">
                  <Magnetic>
                    <a className="button button-primary" href={action.value.href}>
                      {action.value.label}
                      <ArrowRight size={18} weight="bold" aria-hidden="true" />
                    </a>
                  </Magnetic>
                </div>
              ) : null}

              {publishedChannels.length > 0 ? (
                <div className="contact-channels" aria-label="联系方式">
                  {publishedChannels.map((channel, index) => {
                    const ChannelIcon = channelIcons[index % channelIcons.length]
                    const href = channel.href.status === 'verified' ? channel.href.value : '#contact'
                    return (
                      <a className="channel-link" href={href} key={channel.label}>
                        <ChannelIcon size={20} aria-hidden="true" />
                        <span className="channel-label">{channel.label}</span>
                        {channel.value.status === 'verified' ? (
                          <span className="channel-value">{channel.value.value}</span>
                        ) : null}
                      </a>
                    )
                  })}
                </div>
              ) : null}
            </Reveal>

            <Reveal className="contact-media-wrap" delay={0.08} variant="wipe">
              <div className="contact-media" aria-hidden="true" ref={parallax.ref}>
                <motion.img
                  src={media.src}
                  alt=""
                  loading="lazy"
                  width="1672"
                  height="942"
                  style={parallax.style ? { ...parallax.style, scale: 1.16 } : undefined}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>
          <span className="footer-brand">{footerBrand}</span>
          <span className="footer-descriptor">{footerDescriptor}</span>
        </p>
        <div className="footer-links" aria-label="公开链接">
          {publishedChannels.map((channel, index) => {
            const ChannelIcon = channelIcons[index % channelIcons.length] ?? LinkSimple
            const href = channel.href.status === 'verified' ? channel.href.value : '#contact'
            return (
              <a className="icon-link" href={href} aria-label={channel.label} key={`footer-${channel.label}`}>
                <ChannelIcon size={22} aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </footer>
    </>
  )
}
