// Nav Layout Resolver

export type NavLayoutKey = 'split' | 'centered' | 'centered-logo'

const SUPPORTED_LAYOUTS: NavLayoutKey[] = ['split', 'centered', 'centered-logo']

export function resolveNavLayout(
  layout_structure: string | undefined,
  tags: string[],
): NavLayoutKey | null {
  if (layout_structure && SUPPORTED_LAYOUTS.includes(layout_structure as NavLayoutKey)) {
    return layout_structure as NavLayoutKey
  }

  if (tags.includes('centered_logo')) return 'centered-logo'
  if (tags.includes('centered'))      return 'centered'
  if (tags.includes('split'))         return 'split'

  console.warn('[resolveNavLayout] Could not resolve layout — layout_structure:', layout_structure, 'tags:', tags)
  return null
}