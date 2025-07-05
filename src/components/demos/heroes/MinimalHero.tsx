import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { HeroBuilderProps } from '../../../types/component.types'
import { fadeInUp, slideIn, staggerContainer } from '../../../lib/animations/variants'
import MinimalBg from '../../../assets/images/minimalHeroBg.webp'
import Heading from '../typography/Heading'
import SimpleButton from '../buttons/SimpleButton'
import { Divider } from '../Divider/Divider'

const MotionHeading = motion(Heading)
const MotionButton = motion(SimpleButton)

const MinimalHero: React.FC<HeroBuilderProps> = ({
  headline = "Let's Dezign Something",
  subheadline = 'DezignRoom is the platform where we make professional design easy, simple, and accessible for everyone.',
  ctaText = 'Get Started',
  layout = 'centered',
  animation = 'none',
}) => {
  const variant = animation === 'fade'
    ? fadeInUp
    : animation === 'slide'
      ? slideIn
      : undefined

  const layoutClasses = {
    split: 'items-start text-left',
    fullwidth: 'items-center text-center w-full',
    centered: 'items-center text-center',
  }[layout]

  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${MinimalBg})` }}
    >
      <motion.div
        className={clsx(
          'relative z-10 font-poppins container mx-auto',
          'px-sm sm:px-md lg:px-xl',
          'flex flex-col justify-center min-h-[75vh] md:min-h-screen',
          layoutClasses
        )}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className={clsx(
            layout === 'split' ? 'text-left' : 'text-center',
            'max-w-5xl space-y-lg md:space-y-xl'
          )}
        >
          <MotionHeading
            level="h1"
            color="primary"
            weight="extrabold"
            align={layout === 'split' ? 'left' : 'center'}
            className="mb-0 dark:text-slate-800"
            variants={variant}
          >
            {headline}
          </MotionHeading>

          <Divider className='mx-auto' width="md" />

          <MotionHeading
            level="h4"
            color="secondary"
            weight="light"
            align={layout === 'split' ? 'left' : 'center'}
            className="max-w-3xl text-slate-800"
            variants={variant}
          >
            {subheadline}
          </MotionHeading>

          <MotionButton
            variant="solid"
            shape="rounded"
            size="md"
            className="mt-lg"
            fullWidth={false}
            variants={variant}
          >
            {ctaText}
          </MotionButton>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MinimalHero