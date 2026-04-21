import type { TimelineProps } from './timeline.types';
import { resolveTimelineLayout } from './timeline.layoutResolver';
import { tokensToTimelineStyles } from './timeline.tokensToStyles';

export function TimelineBase(props: TimelineProps) {
  if (!props.tokens || !props.layoutStructure) {
    console.error('[TimelineBase] Missing tokens or layoutStructure — section will not render', {
      layoutStructure: props.layoutStructure ?? '(missing)',
      hasTokens: Boolean(props.tokens),
    });
    return null;
  }
  const Shell = resolveTimelineLayout(props.layoutStructure);
  const styles = tokensToTimelineStyles(props.tokens);
  return <Shell {...props} styles={styles} />;
}