import React from 'react';
import HeroStacked from '@/components-lib/Hero/Hero_01/HeroStacked';
import HeroImmersive from '@/components-lib/Hero/Hero_02/HeroImmersive';
import HeroSplit from '@/components-lib/Hero/Hero_03/HeroSplit';
import NavBase from '@/components-lib/Nav/NavBase'
import FeaturesBase from '@/components-lib/Features/FeaturesBase'

const componentRegistry: Record<string, React.ComponentType<any>> = {

  // ── Heroes
  stacked: HeroStacked,
  immersive: HeroImmersive,
  split: HeroSplit,

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
