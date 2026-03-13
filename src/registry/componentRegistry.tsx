import { Hero_01, Hero_02, Hero_03, Hero_04 } from "@/components-lib/Hero";

const componentRegistry: Record<string, React.ComponentType<any>> = {
    canonical_hero_001: Hero_01,
    canonical_hero_002: Hero_02,
    canonical_hero_003: Hero_03,
    canonical_hero_004: Hero_04,
}

export default componentRegistry