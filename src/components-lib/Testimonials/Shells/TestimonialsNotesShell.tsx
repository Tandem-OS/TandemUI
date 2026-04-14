import type { TestimonialsNotesProps } from '../testimonials.types';

export function TestimonialsNotesShell({ layoutStructure, slot }: TestimonialsNotesProps) {
  if (layoutStructure !== 'notes') {
    throw new Error(
      `TestimonialsNotesShell: expected "notes", received "${layoutStructure}"`
    );
  }

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {slot.section_heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {slot.testimonial_notes.map((note, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                "{note.quote}"
              </p>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">{note.author_name}</p>
                <p className="text-xs text-gray-400">{note.author_date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {slot.section_cta}
          </button>
        </div>

      </div>
    </section>
  );
}