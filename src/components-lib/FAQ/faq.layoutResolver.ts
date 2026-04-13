import FAQAccordionShell from '@/components-lib/FAQ/Shells/FAQAccordionShell'
import FAQContainedShell from '@/components-lib/FAQ/Shells/FAQContainedShell'
import FAQCenteredSupportShell from '@/components-lib/FAQ/Shells/FAQCenteredSupportShell'
import FAQMinimalShell from '@/components-lib/FAQ/Shells/FAQMinimalShell'
import type { FAQShellProps } from '@/components-lib/FAQ/faq.types'
import type { FC } from 'react'

export function resolveFAQLayout(layout: string | undefined): FC<FAQShellProps> {
  switch (layout) {
    case 'accordion':
      return FAQAccordionShell
    case 'contained':
      return FAQContainedShell
    case 'centered-support':
      return FAQCenteredSupportShell
    case 'minimal':
      return FAQMinimalShell
    default:
      throw new Error(
        `[resolveFAQLayout] Unresolvable layout: "${layout}" — this should have been caught by validateFAQPayload. Check for contract gap between validation and resolver.`
      )
  }
}