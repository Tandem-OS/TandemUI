// Hero_01.validators.ts
import {
    type Hero_01Props,
    type ImageAsset
} from './Hero_01.types';

export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}

// === Constants ===
const URL_PATTERN = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const HEX_COLOR_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// === Main Validation Function ===
export function validateHero01Props(props: Hero_01Props): ValidationResult {
    const errors: ValidationError[] = [];

    // 1. Title validation (max 60 chars)
    if (props.title && props.title.length > 60) {
        errors.push({
            field: 'title',
            message: 'Title must be 60 characters or less'
        });
    }

    // 2. Description validation (max 220 chars)
    if (props.description && props.description.length > 220) {
        errors.push({
            field: 'description',
            message: 'Description must be 220 characters or less'
        });
    }

    // 3. CTA validations
    if (props.primaryCTA) {
        if (props.primaryCTA.text && props.primaryCTA.text.length > 24) {
            errors.push({
                field: 'primaryCTA.text',
                message: 'CTA text must be 24 characters or less'
            });
        }

        if (props.primaryCTA.href && !URL_PATTERN.test(props.primaryCTA.href)) {
            errors.push({
                field: 'primaryCTA.href',
                message: 'CTA href must be a valid URL'
            });
        }
    }

    if (props.secondaryCTA) {
        if (props.secondaryCTA.text && props.secondaryCTA.text.length > 24) {
            errors.push({
                field: 'secondaryCTA.text',
                message: 'CTA text must be 24 characters or less'
            });
        }

        if (props.secondaryCTA.href && !URL_PATTERN.test(props.secondaryCTA.href)) {
            errors.push({
                field: 'secondaryCTA.href',
                message: 'CTA href must be a valid URL'
            });
        }
    }

    // 4. Image aspect ratio validation
    if (props.image && typeof props.image === 'object') {
        const img = props.image as ImageAsset;
        if (img.width && img.height) {
            const aspectRatio = img.width / img.height;
            if (aspectRatio < 1.2 || aspectRatio > 2.0) {
                errors.push({
                    field: 'image',
                    message: 'Image aspect ratio must be between 1.2 and 2.0'
                });
            }
        }
    }

    // 5. Color overrides validation
    if (props.colors) {
        const validateColor = (color: any, path: string) => {
            if (color) {
                if (!color.light || !color.dark) {
                    errors.push({
                        field: path,
                        message: 'Color must have both light and dark values'
                    });
                } else {
                    if (!HEX_COLOR_PATTERN.test(color.light)) {
                        errors.push({
                            field: `${path}.light`,
                            message: 'Must be a valid hex color'
                        });
                    }
                    if (!HEX_COLOR_PATTERN.test(color.dark)) {
                        errors.push({
                            field: `${path}.dark`,
                            message: 'Must be a valid hex color'
                        });
                    }
                }
            }
        };

        validateColor(props.colors.background, 'colors.background');
        validateColor(props.colors.title, 'colors.title');
        validateColor(props.colors.description, 'colors.description');

        // Button colors - validate full structure
        if (props.colors.primaryButton) {
            validateColor(props.colors.primaryButton.background, 'colors.primaryButton.background');
            validateColor(props.colors.primaryButton.text, 'colors.primaryButton.text');
            validateColor(props.colors.primaryButton.border, 'colors.primaryButton.border');

            if (props.colors.primaryButton.hover) {
                validateColor(props.colors.primaryButton.hover.background, 'colors.primaryButton.hover.background');
                validateColor(props.colors.primaryButton.hover.text, 'colors.primaryButton.hover.text');
                validateColor(props.colors.primaryButton.hover.border, 'colors.primaryButton.hover.border');
            }
        }

        if (props.colors.secondaryButton) {
            validateColor(props.colors.secondaryButton.background, 'colors.secondaryButton.background');
            validateColor(props.colors.secondaryButton.text, 'colors.secondaryButton.text');
            validateColor(props.colors.secondaryButton.border, 'colors.secondaryButton.border');

            if (props.colors.secondaryButton.hover) {
                validateColor(props.colors.secondaryButton.hover.background, 'colors.secondaryButton.hover.background');
                validateColor(props.colors.secondaryButton.hover.text, 'colors.secondaryButton.hover.text');
                validateColor(props.colors.secondaryButton.hover.border, 'colors.secondaryButton.hover.border');
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// === Helper Functions ===
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
}

export function sanitizeProps(props: Hero_01Props): Hero_01Props {
    const sanitized = { ...props };

    if (sanitized.title) {
        sanitized.title = truncateText(sanitized.title, 60);
    }

    if (sanitized.description) {
        sanitized.description = truncateText(sanitized.description, 220);
    }

    if (sanitized.primaryCTA?.text) {
        sanitized.primaryCTA.text = truncateText(sanitized.primaryCTA.text, 24);
    }

    if (sanitized.secondaryCTA?.text) {
        sanitized.secondaryCTA.text = truncateText(sanitized.secondaryCTA.text, 24);
    }

    return sanitized;
}