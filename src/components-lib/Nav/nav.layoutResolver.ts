//  Nav Layout Resolver 

export type NavLayoutKey = 'split' | 'centered' | 'centered-logo'

const SUPPORTED_LAYOUTS: NavLayoutKey[] = ['split', 'centered', 'centered-logo']

export function resolveNavLayout(
  layout_structure: string | undefined,
  tags: string[],
): NavLayoutKey {
  if (tags.includes('centered_logo')) return 'centered-logo'

  if (
    layout_structure &&
    SUPPORTED_LAYOUTS.includes(layout_structure as NavLayoutKey)
  ) {
    return layout_structure as NavLayoutKey
  }

  return 'split'
}