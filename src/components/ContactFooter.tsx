import { ArrowRight, EnvelopeSimple, GithubLogo, LinkSimple, WechatLogo } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { ContactChannel, LinkAction, ManagedField, MediaAsset } from '../types/portfolio'
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

  return (
    <>
      <section className="contact-section" id={id} aria-labelledby={`${id}-title`}>
        <div className="contact-inner">
          <Reveal className="contact-copy">
            <h2 className="contact-title" id={`${id}-title`}>{heading}</h2>
            {publishedChannels.length === 0 ? <p className="contact-summary">{fallback}</p> : null}

            {action.status === 'verified' ? (
              <div className="contact-actions">
                <a className="button button-primary" href={action.value.href}>
                  {action.value.label}
                  <ArrowRight size={21} weight="bold" aria-hidden="true" />
                </a>
              </div>
            ) : null}

            {publishedChannels.length > 0 ? (
              <div className="contact-channels" aria-label="联系方式">
                {publishedChannels.map((channel, index) => {
                  const ChannelIcon = channelIcons[index % channelIcons.length]
                  const href = channel.href.status === 'verified' ? channel.href.value : '#contact'
                  return (
                    <a className="channel-link" href={href} key={channel.label}>
                      <ChannelIcon size={21} aria-hidden="true" />
                      {channel.label}
                    </a>
                  )
                })}
              </div>
            ) : null}
          </Reveal>

          <div className="contact-media" aria-hidden="true">
            <img src={media.src} alt="" loading="lazy" width="1672" height="942" />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>{footerBrand}<span aria-hidden="true"> / </span>{footerDescriptor}</p>
        <div className="footer-links" aria-label="公开链接">
          {publishedChannels.map((channel, index) => {
            const ChannelIcon = channelIcons[index % channelIcons.length] ?? LinkSimple
            const href = channel.href.status === 'verified' ? channel.href.value : '#contact'
            return (
              <a className="icon-link" href={href} aria-label={channel.label} key={`footer-${channel.label}`}>
                <ChannelIcon size={23} aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </footer>
    </>
  )
}
