import type { ComponentType } from 'react';
import type { FooterLayoutStructure, FooterShellProps } from './footer.types';

import { FooterInlineShell }        from './Shells/FooterInlineShell';
import { FooterSplitExpandedShell } from './Shells/FooterSplitExpandedShell';
import { FooterMultiColumnShell }   from './Shells/FooterMultiColumnShell';
import { FooterInfoLinksShell }     from './Shells/FooterInfoLinksShell';

const LAYOUT_REGISTRY: Record<FooterLayoutStructure, ComponentType<FooterShellProps>> = {
  'inline_minimal':  FooterInlineShell        as ComponentType<FooterShellProps>,
  'split_expanded':  FooterSplitExpandedShell as ComponentType<FooterShellProps>,
  'multi_column':    FooterMultiColumnShell   as ComponentType<FooterShellProps>,
  'info_links_bar':  FooterInfoLinksShell     as ComponentType<FooterShellProps>,
};

export function resolveFooterLayout(
  layoutStructure: FooterLayoutStructure
): ComponentType<FooterShellProps> {
  const Shell = LAYOUT_REGISTRY[layoutStructure];

  if (!Shell) {
    throw new Error(
      `resolveFooterLayout: no shell registered for layout "${layoutStructure}"`
    );
  }

  return Shell;
}