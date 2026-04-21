import { validateTimelineProps } from '@/components-lib/Timeline/timeline.validation'
import { slotToTimelineProps } from '@/components-lib/Timeline/timeline.slotToProps'
import { TimelineBase } from '@/components-lib/Timeline/TimelineBase'
import type { TimelineLayoutStructure } from '@/components-lib/Timeline/timeline.types'

interface TimelineRendererProps {
  raw: {
    layout_structure: string
    tokens: Record<string, any>
    content_slots: Record<string, any>
  }
}

export function TimelineRenderer({ raw }: TimelineRendererProps) {
  const validated = validateTimelineProps({
    layoutStructure: raw.layout_structure as TimelineLayoutStructure,
    tokens: raw.tokens,
    slot: raw.content_slots,
  })

  const props = slotToTimelineProps(
    validated.layoutStructure,
    validated.tokens,
    validated.slot,
  )

  return <TimelineBase {...props} />
}