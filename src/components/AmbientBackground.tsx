import type { ThemeKey } from '../types/portfolio'

/**
 * Per-theme ambient background layer.
 * Fixed, non-interactive, below .site-shell (z-index 0 vs 1).
 * Animation uses transform/opacity only; editorial keeps paper pure.
 */
export function AmbientBackground({ theme }: { theme: ThemeKey }) {
  if (theme === 'editorial') return null

  return (
    <div className={`ambient ambient-${theme}`} aria-hidden="true">
      {theme === 'studio' ? (
        <>
          <span className="ambient-blob ambient-blob-a" />
          <span className="ambient-blob ambient-blob-b" />
        </>
      ) : null}
      {theme === 'cinema' ? <span className="ambient-beam" /> : null}
      {theme === 'product' ? <span className="ambient-halo" /> : null}
    </div>
  )
}
