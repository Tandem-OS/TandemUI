import type { ContactFormField } from './contact.types';
import type { ContactStyles } from './contact.tokensToStyles';

export function renderFormFields(
  fields: ContactFormField[],
  styles: ContactStyles
) {
  return fields.map((field, i) => (
    <div key={i} className="flex flex-col gap-1.5">
      <label className={`${styles.label} text-sm font-medium`}>
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          placeholder={field.placeholder}
          rows={4}
          className={`
            ${styles.surface}
            w-full px-4 py-3 rounded-lg
            text-sm leading-relaxed
            border border-border-default
            focus:outline-none focus:border-accent-default focus:ring-1 focus:ring-accent-default
            hover:border-border-focus
            transition-colors duration-200
            resize-none
            placeholder:opacity-40
          `}
        />
      ) : (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className={`
            ${styles.surface}
            w-full px-4 py-3 rounded-lg
            text-sm
            border border-border-default
            focus:outline-none focus:border-accent-default focus:ring-1 focus:ring-accent-default
            hover:border-border-focus
            transition-colors duration-200
            placeholder:opacity-40
          `}
        />
      )}
    </div>
  ));
}
