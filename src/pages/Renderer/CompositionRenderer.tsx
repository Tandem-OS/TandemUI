import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaExpand, FaCompress } from 'react-icons/fa'
import {
  selectActiveOrPreviewSchema,
} from '@/features/composition/compositionSelectors'
import { setPageSchema } from '@/features/composition/compositionSlice'
import { getCompose } from '@/lib/requests/CompositionRequest'
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

const CompositionRenderer: React.FC<Props> = ({ compositionId: compositionIdProp }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const params = useParams<{ id?: string }>()
  const [fullscreen, setFullscreen] = useState(false)
  const activeSchema = useSelector(selectActiveOrPreviewSchema)

  // On page reload the parent prop may not be set yet — fall back to URL param
  const compositionId = compositionIdProp ?? params.id ?? null
  useEffect(() => {
    if (activeSchema || !compositionId) return

    // On fresh page load (e.g. direct URL or reload) Redux has no schema.
    // pollForThumbnails waits POLL_INTERVAL_MS before the first fetch — too slow.
    // Fetch directly and populate state immediately, no delay.
    let cancelled = false
    const fetchNow = async () => {
      try {
        const data = await getCompose(compositionId)
        if (!cancelled && data?.page_schema) {
          dispatch(setPageSchema(data.page_schema))
        }
      } catch {
        // Fallback to polling if direct fetch fails
        if (!cancelled) dispatch(pollForThumbnails({ compositionId }))
      }
    }
    fetchNow()
    return () => { cancelled = true }
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
      {/* ── Floating exit bar ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-md py-sm
          bg-background-primary/90 backdrop-blur-sm border-b border-border-default
          shadow-sm transition-transform duration-300
          ${fullscreen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ height: '48px' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
        >
          <FaArrowLeft className="text-icon-sm" />
          Back
        </button>

        <span className="text-para-xs text-text-tertiary font-medium tracking-wide uppercase">
          Preview
        </span>

        <button
          onClick={() => setFullscreen(f => !f)}
          className="flex items-center gap-xs text-para-sm text-text-secondary hover:text-text-primary transition-colors"
          title="Exit full screen"
        >
          <FaCompress className="text-icon-sm" />
          <span className="text-para-xs hidden sm:inline">Exit full screen</span>
        </button>
      </div>

      {/* Full screen trigger strip — visible tap zone at top edge when bar is hidden */}
      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          className="fixed top-0 left-0 right-0 z-[9998] flex items-center justify-center cursor-pointer"
          style={{ height: '12px', background: 'rgba(99,102,241,0.18)' }}
          title="Tap to show toolbar"
        >
          <div className="w-10 h-1 rounded-full bg-accent-default/60" />
        </div>
      )}

      {/* Spacer so content isn't hidden behind the bar */}
      {!fullscreen && <div style={{ height: '48px' }} />}

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