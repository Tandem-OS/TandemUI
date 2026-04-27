import type { TestimonialsNotesShellProps } from '../testimonials.types';

export function TestimonialsNotesShell({ layoutStructure, slot, styles }: TestimonialsNotesShellProps) {
  if (layoutStructure !== 'notes') {
    throw new Error(
      `TestimonialsNotesShell: expected "notes", received "${layoutStructure}"`
    );
  }

  return (
    <section className={`${styles.wrapper} w-full px-6 md:px-12`}>
      <div className="max-w-6xl mx-auto">

        <h2 className={`${styles.heading} text-center mb-12`}>
          {slot.section_heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {slot.testimonial_notes.map((note, index) => (
            <div key={index} className={`${styles.card} rounded-xl p-6`}>
              <p className={`${styles.body} mb-6`}>
                "{note.quote}"
              </p>
              <div className="flex items-center justify-between">
                <p className={styles.heading}>{note.author_name}</p>
                <p className={styles.subheading}>{note.author_date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className={styles.action}>
            {slot.section_cta}
          </button>
        </div>

      </div>
    </section>
  );
}