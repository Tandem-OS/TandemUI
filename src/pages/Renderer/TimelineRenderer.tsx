import { validateTimelineProps } from '@/components-lib/Timeline/timeline.validation'
import { slotToTimelineProps } from '@/components-lib/Timeline/timeline.slotToProps'
import { TimelineBase } from '@/components-lib/Timeline/TimelineBase'
import type { TimelineLayoutStructure, TimelineTokens } from '@/components-lib/Timeline/timeline.types'

interface TimelineRendererProps {
  raw: {
    layout_structure: string
    tokens:           TimelineTokens
    content_slots:    Record<string, unknown>
  }
}

export function TimelineRenderer({ raw }: TimelineRendererProps) {
  const validated = validateTimelineProps({
    layoutStructure: raw.layout_structure as TimelineLayoutStructure,
    tokens:          raw.tokens,
    slot:            raw.content_slots,
  })

  if (!validated) {
    return null
  }

  const props = slotToTimelineProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot,
  )

  if (!props) {
    return null
  }

  return <TimelineBase {...props} />
}
