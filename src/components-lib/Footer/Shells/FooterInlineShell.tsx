import type { FooterInlineMinimalShellProps } from '../footer.types';

export function FooterInlineShell({ slot, styles }: FooterInlineMinimalShellProps) {
  return (
    <footer className={`${styles.wrapper} relative overflow-hidden`}>
      <img
        src={slot.background_image_url}
        alt={slot.background_image_alt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={styles.overlayText}>
          {slot.footer_text}
        </p>
        <nav className="flex flex-wrap items-center gap-6">
          {slot.footer_links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={styles.overlayText}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}