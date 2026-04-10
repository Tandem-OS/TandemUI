import FAQAccordionShell from '@/components-lib/FAQ/Shells/FAQAccordionShell'
import FAQContainedShell from '@/components-lib/FAQ/Shells/FAQContainedShell'

export function resolveFAQLayout(layout?: string) {
  switch (layout) {
    case 'contained':
      return FAQContainedShell

    case 'accordion':
    default:
      return FAQAccordionShell
  }
}