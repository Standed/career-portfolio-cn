import { Briefcase } from '@phosphor-icons/react'
import { roleNarratives } from '../content/presets'
import type { RoleKey } from '../types/portfolio'
import { roleKeys } from '../content/presets'

type RoleSwitcherProps = {
  value: RoleKey
  onChange: (role: RoleKey) => void
}

export function RoleSwitcher({ value, onChange }: RoleSwitcherProps) {
  return (
    <label className="theme-switcher role-switcher">
      <Briefcase size={18} weight="regular" aria-hidden="true" />
      <span className="theme-switcher-label">目标岗位</span>
      <select
        value={value}
        aria-label="选择目标岗位"
        onChange={(event) => onChange(event.target.value as RoleKey)}
      >
        {roleKeys.map((key) => (
          <option value={key} key={key}>{roleNarratives[key].name}</option>
        ))}
      </select>
    </label>
  )
}
