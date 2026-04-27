import { validateFooterProps } from '@/components-lib/Footer/footer.validation'
import { slotToFooterProps } from '@/components-lib/Footer/footer.slotToProps'
import { FooterBase } from '@/components-lib/Footer/FooterBase'
import type { FooterLayoutStructure, FooterTokens } from '@/components-lib/Footer/footer.types'

interface FooterRendererProps {
  raw: {
    layout_structure: string
    tokens:           FooterTokens
    content_slots:    Record<string, unknown>
  }
}

export function FooterRenderer({ raw }: FooterRendererProps) {
  const validated = validateFooterProps({
    layoutStructure: raw.layout_structure as FooterLayoutStructure,
    tokens:          raw.tokens,
    slot:            raw.content_slots,
  })

  if (!validated) {
    console.error('[FooterRenderer] validateFooterProps returned null', {
      layout_structure: raw.layout_structure,
      hasTokens:        Boolean(raw.tokens),
    })
    return null
  }

  const props = slotToFooterProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot,
  )

  if (!props) {
    console.error('[FooterRenderer] slotToFooterProps returned null', {
      layoutStructure: validated.layoutStructure,
    })
    return null
  }

  return <FooterBase {...props} />
}