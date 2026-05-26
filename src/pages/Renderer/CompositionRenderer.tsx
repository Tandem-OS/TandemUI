import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectActiveOrPreviewSchema,
} from '@/features/composition/compositionSelectors'
import HeroRenderer from '@/pages/Renderer/HeroRenderer'
import NavRenderer from '@/pages/Renderer/NavRenderer'
import FeaturesRenderer from '@/pages/Renderer/FeaturesRenderer'
import PricingRenderer from '@/pages/Renderer/PricingRenderer'
import FAQRenderer from '@/pages/Renderer/FAQRenderer'
import { TestimonialsRenderer } from '@/pages/Renderer/TestimonialsRenderer'
import { CTARenderer } from '@/pages/Renderer/CTARenderer'
import { ContactRenderer } from '@/pages/Renderer/ContactRenderer'
import { TimelineRenderer } from '@/pages/Renderer/TimelineRenderer'
import { FooterRenderer } from '@/pages/Renderer/FooterRenderer'
import type { AppDispatch } from '@/store'
import { pollForThumbnails } from '@/features/composition/compositionSlice'
import type { NavComposeSection } from '@/components-lib/Nav/nav.types'
import type { FeaturesComposeSection } from '@/components-lib/Features/features.types'
import type { ComposeSection, HeroComposeSection, PricingComposeSection } from '@/pages/Renderer/CompositionType'

interface Props {
  compositionId?: string | null
}

const CompositionRenderer: React.FC<Props> = ({ compositionId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const activeSchema = useSelector(selectActiveOrPreviewSchema)
  useEffect(() => {
    if (!activeSchema && compositionId) {
      dispatch(pollForThumbnails({ compositionId }))
    }
  }, [activeSchema, compositionId, dispatch])
  if (!activeSchema) return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary">
      <div className="w-10 h-10 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />
    </div>
  )

  const sections: ComposeSection[] = activeSchema.sections ?? []

  if (!sections.length) return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary">
      <p className="text-text-secondary">No sections found in this composition.</p>
    </div>
  )

  const ordered = [...sections].sort((a, b) => a.position - b.position)

  return (
    <>
      {ordered.map((section) => {
        switch (section.category) {
          case 'nav':
            return <NavRenderer key={section.component_id} sections={[section as NavComposeSection]} />
          case 'hero':
            return <HeroRenderer key={section.component_id} sections={[section as HeroComposeSection]} />
          case 'features':
            return <FeaturesRenderer key={section.component_id} sections={[section as FeaturesComposeSection]} />
          case 'pricing':
            return <PricingRenderer key={section.component_id} sections={[section as PricingComposeSection]} />
          case 'faq':
            return <FAQRenderer key={section.component_id} sections={[section]} />
          case 'testimonials':
            return <TestimonialsRenderer key={section.component_id} raw={{ layout_structure: section.layout_structure, tokens: section.tokens, content_slots: section.content_slots }} />
          case 'cta':
            return <CTARenderer key={section.component_id} raw={{ layout_structure: section.layout_structure, tokens: section.tokens, content_slots: section.content_slots }} />
          case 'contact':
            return <ContactRenderer key={section.component_id} raw={{ layout_structure: section.layout_structure, tokens: section.tokens, content_slots: section.content_slots }} />
          case 'timeline':
            return <TimelineRenderer key={section.component_id} raw={{ layout_structure: section.layout_structure, tokens: section.tokens, content_slots: section.content_slots }} />
          case 'footer':
            return <FooterRenderer key={section.component_id} raw={{ layout_structure: section.layout_structure, tokens: section.tokens, content_slots: section.content_slots }} />
          default: {
            const _exhaustive: never = section
            void _exhaustive
            return (
              <section key={(section as any).component_id} style={{ padding: '2rem', color: 'red' }}>
                [CompositionRenderer] Unknown category: "{(section as any).category}"
              </section>
            )
          }
        }
      })}
    </>
  )
}

export default CompositionRenderer
