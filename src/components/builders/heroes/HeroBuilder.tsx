// components/HeroBuilder.tsx
import React from 'react'
import type { HeroBuilderProps } from '../../../types/component.types'
import CreativeHero from '../../demos/heroes/CreativeHero'
import MinimalHero from '../../demos/heroes/MinimalHero'
import ModernHero from '../../demos/heroes/ModernHero'

const HeroBuilder: React.FC<HeroBuilderProps> = (props) => {
    const style = props.style || 'minimal'
    if (style === 'modern') return <ModernHero {...props} />
    if (style === 'creative') return <CreativeHero {...props} />
    return <MinimalHero {...props} />
}

export default HeroBuilder
