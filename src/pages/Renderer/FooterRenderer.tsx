import { validateFooterProps } from '@/components-lib/Footer/footer.validation'
import { slotToFooterProps } from '@/components-lib/Footer/footer.slotToProps'
import { FooterBase } from '@/components-lib/Footer/FooterBase'
import type { FooterLayoutStructure } from '@/components-lib/Footer/footer.types'

interface FooterRendererProps {
  raw: {
    layout_structure: string
    tokens: Record<string, any>
    content_slots: Record<string, any>
  }
}

export function FooterRenderer({ raw }: FooterRendererProps) {
  const validated = validateFooterProps({
    layoutStructure: raw.layout_structure as FooterLayoutStructure,
    tokens: raw.tokens,
    slot: raw.content_slots,
  })

  const props = slotToFooterProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot,
  )

  return <FooterBase {...props} />
}