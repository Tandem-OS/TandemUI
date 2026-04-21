import type {
  TimelineProps,
  TimelineLayoutStructure,
  TimelineTokens,
  TimelineVerticalEditorialSlot,
  TimelineAlternatingMediaSlot,
} from './timeline.types';

export function slotToTimelineProps(
  layoutStructure: TimelineLayoutStructure,
  tokens: TimelineTokens,
  slot: TimelineVerticalEditorialSlot | TimelineAlternatingMediaSlot
): TimelineProps {
  if (!layoutStructure) throw new Error('slotToTimelineProps: layoutStructure is required');
  if (!tokens)          throw new Error('slotToTimelineProps: tokens is required');
  if (!slot)            throw new Error('slotToTimelineProps: slot is required');

  switch (layoutStructure) {
    case 'vertical_editorial':
      return { layoutStructure, tokens, slot: slot as TimelineVerticalEditorialSlot };
    case 'alternating_media':
      return { layoutStructure, tokens, slot: slot as TimelineAlternatingMediaSlot };
  }
}