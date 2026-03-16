import React from 'react'
import type { FeaturesColors, FeaturesItem, FeaturesAction } from '@/pages/Renderer/CompositionType'

interface FeaturesBaseProps {
  features_heading?: string;
  features_subheading?: string;
  features_variant?: string;
  features_items: FeaturesItem[];
  features_media?: string;
  features_primary_action?: FeaturesAction;
  features_secondary_action?: FeaturesAction;
  colors: FeaturesColors;
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

  const sectionStyle: React.CSSProperties = {
    backgroundColor: colors.background,
    color:           colors.text_color,
    padding:         colors.padding,
    boxSizing:       'border-box',
  };

  const headingStyle: React.CSSProperties = {
    fontSize:   colors.heading_size,
    fontWeight: colors.heading_weight,
    color:      colors.text_color,
    margin:     '0 0 12px 0',
  };

  const subheadingStyle: React.CSSProperties = {
    color:   colors.text_color,
    opacity: 0.7,
    margin:  '0 0 40px 0',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.card_bg,
    borderRadius:    colors.card_radius,
    padding:         '28px',
  };

  const SectionHeader = () => (
    <div style={{ marginBottom: '48px' }}>
      {features_heading && <h2 style={headingStyle}>{features_heading}</h2>}
      {features_subheading && <p style={subheadingStyle}>{features_subheading}</p>}
    </div>
  );

  const Actions = () => (
    <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
      {features_primary_action && (
        <a href={features_primary_action.target}>{features_primary_action.label}</a>
      )}
      {features_secondary_action && (
        <a href={features_secondary_action.target}>{features_secondary_action.label}</a>
      )}
    </div>
  );

  if (features_variant === 'gallery') {
    return (
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <SectionHeader />
            {features_items.map((item, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <h3 style={{ color: colors.text_color }}>{item.title}</h3>
                {item.description && (
                  <p style={{ color: colors.text_color, opacity: 0.7 }}>{item.description}</p>
                )}
              </div>
            ))}
            <Actions />
          </div>
          {features_media && (
            <div>
              <img
                src={features_media}
                alt={features_heading ?? 'Feature media'}
                style={{ width: '100%', borderRadius: colors.card_radius, display: 'block' }}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (features_variant === 'stats') {
    return (
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center' }}>
          <SectionHeader />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {features_items.map((item, i) => (
            <div key={i} style={cardStyle}>
              <h3 style={{ ...headingStyle, fontSize: '1.1rem' }}>{item.title}</h3>
              {item.description && (
                <p style={{ color: colors.text_color, opacity: 0.7, margin: 0 }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
        {(features_primary_action || features_secondary_action) && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
            <Actions />
          </div>
        )}
      </section>
    );
  }

  return null;
};

export default FeaturesBase