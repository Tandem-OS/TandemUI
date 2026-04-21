// components-lib/FAQ/faq.shellUtils.ts

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations/variants'

export type AnimatedWrapper = typeof motion.div | 'div'

export function getAnim(delay: number, animated: boolean) {
  if (!animated) return {}

  return {
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true },
    variants: fadeInUp,
    transition: { delay },
  }
}

export function resolveWrap(animated: boolean): AnimatedWrapper {
  return animated ? motion.div : 'div'
}