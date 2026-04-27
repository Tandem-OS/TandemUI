import type {
  FooterProps,
  FooterLayoutStructure,
  FooterTokens,
  FooterInlineMinimalSlot,
  FooterSplitExpandedSlot,
  FooterMultiColumnSlot,
  FooterInfoLinksBarSlot,
} from './footer.types';

export function slotToFooterProps(
  layoutStructure: FooterLayoutStructure,
  tokens: FooterTokens,
  slot:
    | FooterInlineMinimalSlot
    | FooterSplitExpandedSlot
    | FooterMultiColumnSlot
    | FooterInfoLinksBarSlot
): FooterProps {
  if (!layoutStructure) throw new Error('slotToFooterProps: layoutStructure is required');
  if (!tokens)          throw new Error('slotToFooterProps: tokens is required');
  if (!slot)            throw new Error('slotToFooterProps: slot is required');

  switch (layoutStructure) {
    case 'inline_minimal':
      return { layoutStructure, tokens, slot: slot as FooterInlineMinimalSlot };
    case 'split_expanded':
      return { layoutStructure, tokens, slot: slot as FooterSplitExpandedSlot };
    case 'multi_column':
      return { layoutStructure, tokens, slot: slot as FooterMultiColumnSlot };
    case 'info_links_bar':
      return { layoutStructure, tokens, slot: slot as FooterInfoLinksBarSlot };
  }
}