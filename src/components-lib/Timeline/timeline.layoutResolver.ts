import type { ComponentType } from 'react';
import type { TimelineLayoutStructure, TimelineShellProps } from './timeline.types';

import { TimelineVerticalShell }        from './Shells/TimelineVerticalShell';
import { TimelineAlternatingMediaShell } from './Shells/TimelineAlternatingMediaShell';

const LAYOUT_REGISTRY: Record<TimelineLayoutStructure, ComponentType<TimelineShellProps>> = {
  'vertical_editorial': TimelineVerticalShell        as ComponentType<TimelineShellProps>,
  'alternating_media':  TimelineAlternatingMediaShell as ComponentType<TimelineShellProps>,
};

export function resolveTimelineLayout(
  layoutStructure: TimelineLayoutStructure
): ComponentType<TimelineShellProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveTimelineLayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}