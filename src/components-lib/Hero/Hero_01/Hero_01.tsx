import React, { type CSSProperties, useMemo, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { fadeInUp, fadeIn } from '../../../lib/animations/variants';
import Heading from '../../../components/demos/typography/Heading';
import SimpleButton from '../../../components/demos/buttons/SimpleButton';
import Para from '../../../common-components/Para';
import {
  type Hero_01Props,
  defaultColors,
  type ButtonProps,
  type ImageProps,
  type Hero_01Colors,
  TEXT_LIMITS
} from './Hero_01.types';

type ColorValue = { light?: string; dark?: string };
type ButtonHoverConfig = {
  background?: ColorValue;
  text?: ColorValue;
  border?: ColorValue;
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const useComponentStyles = (
  props: Pick<Hero_01Props, 'colors' | 'primaryCTA' | 'secondaryCTA'>,
  theme: 'light' | 'dark'
) => {
  const { colors, primaryCTA, secondaryCTA } = props;

  return useMemo(() => {
    const getColor = (config: ColorValue | undefined, fallback: string): string => {
      if (!config) return fallback;
      return (theme === 'dark' ? config.dark : config.light) ?? config.light ?? fallback;
    };

    const getButtonConfig = (
      buttonProps: ButtonProps | undefined,
      colorOverride: Hero_01Colors['primaryButton']
    ) => {
      const baseConfig = buttonProps?.variant === 'solid' ? defaultColors.primaryButton : defaultColors.secondaryButton;
      return {
        ...baseConfig,
        ...colorOverride,
        hover: {
          ...baseConfig?.hover,
          ...colorOverride?.hover,
        },
      };
    };

    const mergedPrimaryButton = getButtonConfig(primaryCTA, colors?.primaryButton);
    const mergedSecondaryButton = getButtonConfig(secondaryCTA, colors?.secondaryButton);

    const createButtonStyles = (config: typeof mergedPrimaryButton): CSSProperties => ({
      background: getColor(config.background, 'transparent'),
      color: getColor(config.text, '#000000'),
      borderColor: getColor(config.border, '#000000'),
      borderWidth: '2px',
      borderStyle: 'solid',
    });

    return {
      background: { background: getColor({ ...defaultColors.background, ...colors?.background }, '#ffffff') },
      title: { color: getColor({ ...defaultColors.title, ...colors?.title }, '#111827') },
      description: { color: getColor({ ...defaultColors.description, ...colors?.description }, '#4b5563') },
      primaryButton: createButtonStyles(mergedPrimaryButton),
      secondaryButton: createButtonStyles(mergedSecondaryButton),
      primaryButtonHover: mergedPrimaryButton.hover || {},
      secondaryButtonHover: mergedSecondaryButton.hover || {},
      getColor,
    };
  }, [colors, primaryCTA, secondaryCTA, theme]);
};

const ActionButton: React.FC<{
  buttonProps: ButtonProps;
  baseStyles: CSSProperties;
  hoverConfig: ButtonHoverConfig;
  getColor: (config: ColorValue | undefined, fallback: string) => string;
}> = ({ buttonProps, baseStyles, hoverConfig, getColor }) => {
  const handleHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
    const target = e.currentTarget.style;
    if (isHovering && hoverConfig) {
      target.background = getColor(hoverConfig.background, baseStyles.background as string);
      target.color = getColor(hoverConfig.text, baseStyles.color as string);
      target.borderColor = getColor(hoverConfig.border, baseStyles.borderColor as string);
    } else {
      Object.assign(target, {
        background: baseStyles.background,
        color: baseStyles.color,
        borderColor: baseStyles.borderColor,
      });
    }
  }, [baseStyles, hoverConfig, getColor]);

  return (
    <div className="w-full md:w-auto">
      <SimpleButton
        variant="basic"
        size={buttonProps.size}
        fullWidth
        className="md:w-auto transition-all duration-200 hover:shadow-lg"
        style={baseStyles}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
        linkTo={buttonProps.href}
        icon={buttonProps.icon}
      >
        {buttonProps.text}
      </SimpleButton>
    </div>
  );
};

const getAnimationProps = (variant: Variants, delay = 0, amount = 0, animated = true) => {
  if (!animated) return {};
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: amount || undefined },
    variants: variant,
    transition: { delay }
  };
};

const Hero_01: React.FC<Hero_01Props> = (props) => {
  const { animated = true, className = "" } = props;
  const { theme } = useTheme();

  // ✅ Merge user props with defaults for robust handling
  const finalTitle = truncateText(props.title || "Medium length hero heading goes here", TEXT_LIMITS.title);
  const finalDescription = truncateText(props.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.", TEXT_LIMITS.description);

  const finalPrimaryCTA: ButtonProps = {
    text: "Get Started",
    href: "/signup",
    variant: "solid",
    size: "lg",
    ...props.primaryCTA,
  };

  const finalSecondaryCTA: ButtonProps = {
    text: "Learn More",
    href: "/learn",
    variant: "outline",
    size: "lg",
    ...props.secondaryCTA,
  };

  const finalImage: ImageProps = {
    src: "/images/component-lib-images/hero/placeholder-img.png",
    alt: "Illustration showing app usage",
    ...props.image,
  };

  const styles = useComponentStyles({
    colors: props.colors,
    primaryCTA: finalPrimaryCTA,
    secondaryCTA: finalSecondaryCTA,
  }, theme);

  return (
    <section
      className={`relative w-full lg:h-screen lg:overflow-hidden ${className}`}
      style={styles.background}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
        <motion.div
          className="flex flex-col justify-center px-lg py-xl lg:px-2xl xl:px-5xl 2xl:px-6xl order-1 lg:order-1 min-h-[50vh] lg:min-h-0"
          {...getAnimationProps(fadeInUp, 0, 0.3, animated)}
        >
          <div className="xl:max-w-lg space-y-md lg:space-y-lg">
            <motion.div {...getAnimationProps(fadeInUp, 0, 0, animated)}>
              <Heading
                level="h1"
                weight="bold"
                className="text-h2-sm lg:text-h1-md"
                style={styles.title}
              >
                {finalTitle}
              </Heading>
            </motion.div>
            <motion.div {...getAnimationProps(fadeInUp, 0.1, 0, animated)}>
              <Para
                size="md"
                className="lg:text-para-lg leading-relaxed"
                style={styles.description}
              >
                {finalDescription}
              </Para>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-md"
              {...getAnimationProps(fadeInUp, 0.2, 0, animated)}
            >
              <ActionButton
                buttonProps={finalPrimaryCTA}
                baseStyles={styles.primaryButton}
                hoverConfig={styles.primaryButtonHover}
                getColor={styles.getColor}
              />
              {props.secondaryCTA !== null && ( // Allow hiding secondaryCTA by passing null
                <ActionButton
                  buttonProps={finalSecondaryCTA}
                  baseStyles={styles.secondaryButton}
                  hoverConfig={styles.secondaryButtonHover}
                  getColor={styles.getColor}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
        <div className="relative h-96 lg:h-screen order-2 lg:order-2">
          <motion.div
            className="w-full h-full"
            {...getAnimationProps(fadeIn, 0, 0.3, animated)}
          >
            <img
              src={finalImage.src}
              alt={finalImage.alt}
              className="w-full h-full lg:h-screen object-cover object-bottom"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero_01;