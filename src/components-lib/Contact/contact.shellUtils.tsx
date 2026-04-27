import type { ContactFormField } from './contact.types';
import type { ContactStyles } from './contact.tokensToStyles';

export function renderFormFields(
  fields: ContactFormField[],
  styles: ContactStyles
) {
  return fields.map((field, i) => (
    <div key={i} className="flex flex-col gap-1">
      <label className={styles.body}>{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          placeholder={field.placeholder}
          rows={4}
          className={`${styles.surface} w-full px-4 py-3 rounded-lg focus:outline-none resize-none`}
        />
      ) : (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className={`${styles.surface} w-full px-4 py-3 rounded-lg focus:outline-none`}
        />
      )}
    </div>
  ));
}