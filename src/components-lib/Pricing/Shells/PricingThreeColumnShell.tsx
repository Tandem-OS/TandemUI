import React, { useState } from 'react'
import type { PricingShellProps, PricingPlan } from '@/components-lib/Pricing/pricing.types'
import { renderPricingAction } from '@/components-lib/Pricing/pricing.shellUtils'

const PricingThreeColumnShell: React.FC<PricingShellProps> = ({ props, styles }) => {
  const {
    pricing_plans,
    pricing_heading,
    pricing_subheading,
    pricing_billing_toggle,
    pricing_billing_note,
    pricing_logos,
  } = props

  const [isAnnual, setIsAnnual] = useState(false)

  const sectionStyle: React.CSSProperties = {
    width:           '100%',
    backgroundColor: styles.background,
    padding:         styles.padding,
  }

  const headingStyle: React.CSSProperties = {
    fontSize:   styles.heading_size,
    fontWeight: styles.heading_weight,
    color:      styles.heading_color,
    margin:     0,
    textAlign:  'center',
  }

  const subheadingStyle: React.CSSProperties = {
    color:     styles.subheading_color,
    textAlign: 'center',
    margin:    '1rem 0 0',
  }

  const gridStyle: React.CSSProperties = {
    display:             'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap:                 '1.5rem',
    maxWidth:            '72rem',
    margin:              '0 auto',
  }

  const renderPlan = (plan: PricingPlan) => {
    const price = isAnnual ? plan.price_annual : plan.price_monthly

    const cardStyle: React.CSSProperties = {
      display:         'flex',
      flexDirection:   'column',
      backgroundColor: plan.is_featured
        ? (styles.featured_card_bg  ?? styles.card_bg)
        : styles.card_bg,
      borderRadius:    styles.card_radius,
      border:          plan.is_featured
        ? `2px solid ${styles.featured_card_border ?? styles.card_border}`
        : `1px solid ${styles.card_border}`,
      padding:         '2rem',
      gap:             '1.5rem',
    }

    return (
      <div key={plan.id} style={cardStyle}>

        {/* Badge */}
        {plan.is_featured && plan.featured_badge && (
          <div style={{
            alignSelf:       'flex-start',
            fontSize:        '0.75rem',
            fontWeight:      600,
            padding:         '0.25rem 0.75rem',
            borderRadius:    '9999px',
            backgroundColor: styles.toggle_active,
            color:           styles.btn_primary_color,
          }}>
            {plan.featured_badge}
          </div>
        )}

        {/* Plan name */}
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: styles.heading_color }}>
            {plan.name}
          </p>
          {plan.description && (
            <p style={{ margin: '0.5rem 0 0', color: styles.body_color, fontSize: '0.875rem' }}>
              {plan.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          {price
            ? (
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: styles.price_color }}>
                {plan.currency_label ?? ''}{price}
              </p>
            )
            : (
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: styles.price_color }}>
                —
              </p>
            )
          }
        </div>

        {/* Features */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {plan.features.map((feature, i) => (
            <li key={i} style={{ color: styles.feature_color, fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}>
              <span aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {plan.action && renderPricingAction(plan.action, styles)}

      </div>
    )
  }

  return (
    <section
      data-testid="pricing-section"
      role="region"
      aria-label="Pricing plans"
      style={sectionStyle}
    >
      {/* Header */}
      {(pricing_heading || pricing_subheading) && (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {pricing_heading && (
            <h2 style={headingStyle}>{pricing_heading}</h2>
          )}
          {pricing_subheading && (
            <p style={subheadingStyle}>{pricing_subheading}</p>
          )}
        </div>
      )}

      {/* Billing toggle */}
      {pricing_billing_toggle && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: styles.body_color, fontSize: '0.875rem' }}>Monthly</span>
            <button
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle billing period"
              onClick={() => setIsAnnual(a => !a)}
              style={{
                width:           '48px',
                height:          '26px',
                borderRadius:    '9999px',
                border:          'none',
                cursor:          'pointer',
                backgroundColor: isAnnual
                  ? (styles.toggle_active   ?? '#000')
                  : (styles.toggle_inactive ?? '#ccc'),
                position:        'relative',
                transition:      'background-color 200ms',
              }}
            >
              <span style={{
                position:        'absolute',
                top:             '3px',
                left:            isAnnual ? '25px' : '3px',
                width:           '20px',
                height:          '20px',
                borderRadius:    '9999px',
                backgroundColor: '#ffffff',
                transition:      'left 200ms',
              }} />
            </button>
            <span style={{ color: styles.body_color, fontSize: '0.875rem' }}>Annual</span>
          </div>
          {pricing_billing_note && (
            <p style={{ margin: 0, fontSize: '0.75rem', color: styles.subheading_color }}>
              {pricing_billing_note}
            </p>
          )}
        </div>
      )}

      {/* Plans grid */}
      <div style={gridStyle}>
        {pricing_plans.map(renderPlan)}
      </div>

      {/* Logos */}
      {pricing_logos && pricing_logos.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
          {pricing_logos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              style={{ height: '2rem', objectFit: 'contain', opacity: 0.6 }}
            />
          ))}
        </div>
      )}

    </section>
  )
}

PricingThreeColumnShell.displayName = 'PricingThreeColumnShell'
export default PricingThreeColumnShell