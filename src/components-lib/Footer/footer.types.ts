import type { FooterStyles } from './footer.tokensToStyles';

export type FooterLayoutStructure =
  | 'inline_minimal'
  | 'split_expanded'
  | 'multi_column'
  | 'info_links_bar';

// ─── Tokens
export interface FooterTokens {
  spacing: string;
  surface: string;
  'text-role': string;
  background: string;
  'body-scale': string;
  'bottom-bar': string;
  'action-style': string;
  'heading-scale': string;
}

// ─── Shared
export interface FooterColumn {
  heading: string;
  links: string[];
}

export interface FooterInfoColumn {
  heading: string;
  lines?: string[];
  icon_blocks?: string[];
}

export type FooterLinkStyle = 'arrow_links' | 'plain_links';

// ─── Inline Minimal Slot
export interface FooterInlineMinimalSlot {
  footer_text: string;
  footer_links: string[];
  footer_variant: 'inline_minimal';
  background_image_url: string;
  background_image_alt: string;
}

// ─── Split Expanded Slot
export interface FooterSplitExpandedSlot {
  brand_text: string;
  link_style: FooterLinkStyle;
  bottom_links: string[];
  logo_icon_url: string;
  primary_links: string[];
  copyright_text: string;
  footer_variant: 'split_expanded';
  primary_action: string;
  background_color: string;
  expanded_content_lines: string[];
  expanded_content_title: string;
}

// ─── Multi Column Slot
export interface FooterMultiColumnSlot {
  logo_text: string;
  logo_icon_url: string;
  footer_columns: FooterColumn[];
  footer_variant: 'multi_column';
  background_color: string;
  brand_description: string;
  footer_bottom_link: string;
  footer_bottom_text: string;
}

// ─── Info Links Bar Slot
export interface FooterInfoLinksBarSlot {
  large_links: string[];
  legal_links: string[];
  info_columns: FooterInfoColumn[];
  bottom_bar_cta: string;
  copyright_left: string;
  footer_variant: 'info_links_bar';
  copyright_right: string;
  background_color: string;
  bottom_bar_color: string;
}

// ─── Props
export interface FooterInlineMinimalProps {
  layoutStructure: 'inline_minimal';
  tokens: FooterTokens;
  slot: FooterInlineMinimalSlot;
}

export interface FooterSplitExpandedProps {
  layoutStructure: 'split_expanded';
  tokens: FooterTokens;
  slot: FooterSplitExpandedSlot;
}

export interface FooterMultiColumnProps {
  layoutStructure: 'multi_column';
  tokens: FooterTokens;
  slot: FooterMultiColumnSlot;
}

export interface FooterInfoLinksBarProps {
  layoutStructure: 'info_links_bar';
  tokens: FooterTokens;
  slot: FooterInfoLinksBarSlot;
}

export type FooterProps =
  | FooterInlineMinimalProps
  | FooterSplitExpandedProps
  | FooterMultiColumnProps
  | FooterInfoLinksBarProps;

// ─── Shell props
export type FooterInlineMinimalShellProps  = FooterInlineMinimalProps  & { styles: FooterStyles };
export type FooterSplitExpandedShellProps  = FooterSplitExpandedProps  & { styles: FooterStyles };
export type FooterMultiColumnShellProps    = FooterMultiColumnProps    & { styles: FooterStyles };
export type FooterInfoLinksBarShellProps   = FooterInfoLinksBarProps   & { styles: FooterStyles };

export type FooterShellProps =
  | FooterInlineMinimalShellProps
  | FooterSplitExpandedShellProps
  | FooterMultiColumnShellProps
  | FooterInfoLinksBarShellProps;