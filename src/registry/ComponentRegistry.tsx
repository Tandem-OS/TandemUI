import React from 'react'
import { Hero_01, Hero_02, Hero_03, Hero_04 } from '@/components-lib/Hero'
import NavBase from '@/components-lib/Nav/NavBase'
import FeaturesBase from '@/components-lib/Features/FeaturesBase'

const componentRegistry: Record<string, React.ComponentType<any>> = {
  // ── Heroes
  canonical_hero_001: Hero_01,
  canonical_hero_002: Hero_02,
  canonical_hero_003: Hero_03,
  canonical_hero_004: Hero_04,

  // ── Navs — all map to NavBase, layout derived from API
  canonical_nav_001: NavBase,
  canonical_nav_002: NavBase,
  canonical_nav_003: NavBase,
  canonical_nav_004: NavBase,
  canonical_features_001: FeaturesBase,
  canonical_features_002: FeaturesBase,
  canonical_features_003: FeaturesBase,
  canonical_features_004: FeaturesBase,
}

export default componentRegistry
