import { Palette } from '@phosphor-icons/react'
import { themePresets } from '../content/presets'
import type { ThemeKey } from '../types/portfolio'
import { themeKeys } from './themeRuntime'

type ThemeSwitcherProps = {
  value: ThemeKey
  onChange: (theme: ThemeKey) => void
}

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  return (
    <label className="theme-switcher">
      <Palette size={18} weight="regular" aria-hidden="true" />
      <span className="theme-switcher-label">视觉主题</span>
      <select
        value={value}
        aria-label="选择视觉主题"
        onChange={(event) => onChange(event.target.value as ThemeKey)}
      >
        {themeKeys.map((key) => (
          <option value={key} key={key}>{themePresets[key].name}</option>
        ))}
      </select>
    </label>
  )
}
