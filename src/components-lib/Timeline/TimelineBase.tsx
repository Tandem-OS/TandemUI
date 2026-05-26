import type { TimelineProps } from './timeline.types';
import { resolveTimelineLayout } from './timeline.layoutResolver';
import { tokensToTimelineStyles } from './timeline.tokensToStyles';

export function TimelineBase(props: TimelineProps) {
  if (!props.tokens || !props.layoutStructure) {
    return null;
  }
  const Shell = resolveTimelineLayout(props.layoutStructure);
  const styles = tokensToTimelineStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}
