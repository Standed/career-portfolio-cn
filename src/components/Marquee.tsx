type MarqueeProps = {
  items: readonly string[]
  label: string
}

function MarqueeRun({ items }: { items: readonly string[] }) {
  return (
    <div className="marquee-run" aria-hidden="true">
      {items.map((item, index) => (
        <span className="marquee-item" key={`${item}-${index}`}>
          <span className="marquee-text">{item}</span>
          <span className="marquee-separator" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

export function Marquee({ items, label }: MarqueeProps) {
  if (items.length === 0) return null

  return (
    <div className="marquee" aria-label={label}>
      <div className="marquee-track">
        <MarqueeRun items={items} />
        <MarqueeRun items={items} />
      </div>
    </div>
  )
}
