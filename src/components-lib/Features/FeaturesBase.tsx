import React from 'react'
import type { FeaturesColors, FeaturesItem, FeaturesAction } from './features.types'

interface FeaturesBaseProps {
  features_heading?: string
  features_subheading?: string
  features_variant?: string
  features_items: FeaturesItem[]
  features_media?: string
  features_primary_action?: FeaturesAction
  features_secondary_action?: FeaturesAction
  colors: FeaturesColors
}

const variantConfig: Record<string, {
  gridGap: string
  cardPadding: string
  itemMarginBottom: string
  actionsGap: string
  actionsMarginTop: string
  headerMarginBottom: string
  cardHeadingSize: string
}> = {
  gallery: {
    gridGap:            '60px',
    cardPadding:        '0px',
    itemMarginBottom:   '16px',
    actionsGap:         '16px',
    actionsMarginTop:   '32px',
    headerMarginBottom: '48px',
    cardHeadingSize:    'inherit',
  },
  stats: {
    gridGap:            '24px',
    cardPadding:        '28px',
    itemMarginBottom:   '0px',
    actionsGap:         '16px',
    actionsMarginTop:   '48px',
    headerMarginBottom: '48px',
    cardHeadingSize:    '1.1rem',
  },
}

const actionVariantStyles: Record<string, React.CSSProperties> = {
  primary:   { fontWeight: 600 },
  secondary: { fontWeight: 400 },
  ghost:     { fontWeight: 400, textDecoration: 'underline' },
}

const FeaturesBase: React.FC<FeaturesBaseProps> = ({
  features_heading,
  features_subheading,
  features_variant,
  features_items,
  features_media,
  features_primary_action,
  features_secondary_action,
  colors,
}) => {
  const cfg = features_variant ? variantConfig[features_variant] : undefined

  if (!cfg) {
    console.error(
      `[FeaturesBase] Unsupported or missing features_variant: "${features_variant}". ` +
      `Supported variants: ${Object.keys(variantConfig).join(', ')}`
    )
    return (
      <section style={{ padding: colors.padding, backgroundColor: colors.background }}>
        <p style={{ color: 'red' }}>
          [FeaturesBase] Unknown variant: "{features_variant}"
        </p>
      </section>
    )
  }

  const descriptionColor = colors.description_color ?? colors.text_color

  const sectionStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    color:           colors.text_color,
    padding:         colors.padding,
    boxSizing:       'border-box',
  }

  const headingStyle: React.CSSProperties = {
    fontSize:   colors.heading_size,
    fontWeight: colors.heading_weight,
    color:      colors.text_color,
    margin:     '0 0 12px 0',
  }

  const subheadingStyle: React.CSSProperties = {
    color:  descriptionColor,
    margin: '0 0 40px 0',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.card_bg,
    borderRadius:    colors.card_radius,
    padding:         cfg.cardPadding,
  }

  const SectionHeader = () => (
    <div style={{ marginBottom: cfg.headerMarginBottom }}>
      {features_heading    && <h2 style={headingStyle}>{features_heading}</h2>}
      {features_subheading && <p style={subheadingStyle}>{features_subheading}</p>}
    </div>
  )

  const renderAction = (action: FeaturesAction) => {
    const variantStyle = action.variant
      ? (actionVariantStyles[action.variant] ?? {})
      : {}
    return (
      <a
        href={action.target}
        aria-label={action.aria_label ?? action.label}
        style={{ color: colors.text_color, ...variantStyle }}
      >
        {action.label}
      </a>
    )
  }

  const Actions = () => (
    <div className="flex flex-wrap" style={{ gap: cfg.actionsGap, marginTop: cfg.actionsMarginTop }}>
      {features_primary_action   && renderAction(features_primary_action)}
      {features_secondary_action && renderAction(features_secondary_action)}
    </div>
  )

  if (features_variant === 'gallery') {
    return (
      <section style={sectionStyle}>
        {/* mobile: stack, md+: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: cfg.gridGap, alignItems: 'center' }}>
          <div>
            <SectionHeader />
            {features_items.map((item, i) => (
              <div key={i} style={{ marginBottom: cfg.itemMarginBottom }}>
                <h3 style={{ color: colors.text_color }}>{item.title}</h3>
                {item.description && (
                  <p style={{ color: descriptionColor }}>{item.description}</p>
                )}
              </div>
            ))}
            <Actions />
          </div>
          {features_media && (
            <div className="order-first md:order-last">
              <img
                src={features_media}
                alt={features_heading ?? 'Feature media'}
                style={{ width: '100%', borderRadius: colors.card_radius, display: 'block' }}
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (features_variant === 'stats') {
    return (
      <section style={sectionStyle}>
        <div className="text-center">
          <SectionHeader />
        </div>
        {/* mobile: 1 col, tablet: 2 cols, desktop: auto-fit via 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: cfg.gridGap }}>
          {features_items.map((item, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ ...headingStyle, fontSize: cfg.cardHeadingSize }}>{item.title}</h3>
              {item.description && (
                <p style={{ color: descriptionColor, margin: 0 }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
        {(features_primary_action || features_secondary_action) && (
          <div className="flex justify-center" style={{ marginTop: cfg.actionsMarginTop }}>
            <Actions />
          </div>
        )}
      </section>
    )
  }

  console.error(`[FeaturesBase] Reached unreachable branch for variant: "${features_variant}"`)
  return null
}

export default FeaturesBase