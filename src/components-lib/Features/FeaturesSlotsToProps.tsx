import type { FeaturesSlots } from '@/pages/Renderer/CompositionType';
export type { FeaturesSlots }

export function featuresSlotsToProps(raw: FeaturesSlots) {
  return {
    features_heading:          raw.features_heading,
    features_subheading:       raw.features_subheading,
    features_variant:          raw.features_variant,
    features_items:            Array.isArray(raw.features_items) ? raw.features_items : [],
    features_media:            raw.features_media,
    features_primary_action:   raw.features_primary_action,
    features_secondary_action: raw.features_secondary_action,
  };
}