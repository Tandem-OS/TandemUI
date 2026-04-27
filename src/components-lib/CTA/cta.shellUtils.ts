import type { CTAFooterColumn, CTAFAQItem } from './cta.types';

export function validateFooterColumns(columns: CTAFooterColumn[], context: string): void {
  if (!columns || columns.length === 0) {
    throw new Error(`${context}: footer_columns must be a non-empty array`);
  }
}

export function validateFAQItems(items: CTAFAQItem[], context: string): void {
  if (!items || items.length === 0) {
    throw new Error(`${context}: faq items must be a non-empty array`);
  }
}

export function getExpandedFAQItem(items: CTAFAQItem[]): CTAFAQItem | undefined {
  return items.find(item => item.is_expanded);
}