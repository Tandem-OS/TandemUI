// ── Features Layout Resolver ──────────────────────────────────────────────


export type FeaturesLayoutKey = 'gallery' | 'stats'

const SUPPORTED_LAYOUTS: FeaturesLayoutKey[] = ['gallery', 'stats']


export function resolveFeaturesLayout(
  features_variant: string | undefined,
): FeaturesLayoutKey | null {
  if (
    features_variant &&
    SUPPORTED_LAYOUTS.includes(features_variant as FeaturesLayoutKey)
  ) {
    return features_variant as FeaturesLayoutKey
  }

  return null
}