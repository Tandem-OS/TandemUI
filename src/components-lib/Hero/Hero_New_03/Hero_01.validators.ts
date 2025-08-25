// Hero_01.validators.ts
import {
    type Hero_01Props,
    type ImageAsset,
    type CTAConfig
} from './Hero_01.types';

export interface ValidationError {
    field: string;
    message: string;
    userMessage?: string; // Designer-friendly message
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings?: string[];
}

// === Security Patterns ===
const DANGEROUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /data:text\/html/gi,
    /vbscript:/gi
];

const HEX_COLOR_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const SAFE_CLASS_PATTERN = /^[a-zA-Z0-9\s\-_:]+$/;

// === Security Functions ===
export function containsXSS(text: string): boolean {
    return DANGEROUS_PATTERNS.some(pattern => pattern.test(text));
}

export function isValidURL(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}

export function hasLongWords(text: string, maxWordLength: number = 20): boolean {
    const words = text.split(/\s+/);
    return words.some(word => word.length > maxWordLength);
}

export function sanitizeHTML(html: string): string {
    let sanitized = html;
    DANGEROUS_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });

    // Allow only safe HTML tags
    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'span'];
    const tagPattern = /<\/?([a-zA-Z0-9]+)[^>]*>/g;

    sanitized = sanitized.replace(tagPattern, (match, tagName) => {
        if (allowedTags.includes(tagName.toLowerCase())) {
            return match.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
        }
        return '';
    });

    return sanitized;
}

export function isValidClassName(className: string): boolean {
    return SAFE_CLASS_PATTERN.test(className);
}

// === Main Validation Function ===
export function validateHero01Props(props: Hero_01Props): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    // 1. Title validation with XSS protection
    if (props.title !== undefined) {
        if (typeof props.title !== 'string') {
            errors.push({
                field: 'title',
                message: 'Title must be a string',
                userMessage: 'Please enter text for the title'
            });
        } else {
            if (props.title.length > 60) {
                errors.push({
                    field: 'title',
                    message: `Title must be 60 characters or less (current: ${props.title.length})`,
                    userMessage: `Title is too long. Please shorten to 60 characters (you have ${props.title.length})`
                });
            }

            if (containsXSS(props.title)) {
                errors.push({
                    field: 'title',
                    message: 'Title contains potentially unsafe content',
                    userMessage: 'Title contains invalid characters. Please use only plain text.'
                });
            }

            if (hasLongWords(props.title, 15)) {
                warnings.push('Title has long words that might look awkward on mobile screens');
            }
        }
    }

    // 2. Description validation with XSS protection
    if (props.description !== undefined) {
        if (typeof props.description !== 'string') {
            errors.push({
                field: 'description',
                message: 'Description must be a string',
                userMessage: 'Please enter text for the description'
            });
        } else {
            if (props.description.length > 220) {
                errors.push({
                    field: 'description',
                    message: `Description must be 220 characters or less (current: ${props.description.length})`,
                    userMessage: `Description is too long. Please shorten to 220 characters (you have ${props.description.length})`
                });
            }

            if (containsXSS(props.description)) {
                errors.push({
                    field: 'description',
                    message: 'Description contains potentially unsafe content',
                    userMessage: 'Description contains invalid characters. Please use only plain text.'
                });
            }

            if (hasLongWords(props.description, 20)) {
                warnings.push('Description has very long words that might affect layout');
            }
        }
    }

    // 3. Enhanced CTA validation helper
    const validateCTA = (cta: CTAConfig | undefined, fieldPrefix: string, displayName: string) => {
        if (!cta) return;

        if (cta.text !== undefined) {
            if (typeof cta.text !== 'string') {
                errors.push({
                    field: `${fieldPrefix}.text`,
                    message: `${displayName} text must be a string`,
                    userMessage: `Please enter text for the ${displayName.toLowerCase()} button`
                });
            } else {
                if (cta.text.length > 24) {
                    errors.push({
                        field: `${fieldPrefix}.text`,
                        message: `${displayName} text must be 24 characters or less (current: ${cta.text.length})`,
                        userMessage: `${displayName} button text is too long (max 24 characters)`
                    });
                }

                if (containsXSS(cta.text)) {
                    errors.push({
                        field: `${fieldPrefix}.text`,
                        message: `${displayName} text contains potentially unsafe content`,
                        userMessage: `${displayName} button text contains invalid characters`
                    });
                }
            }
        }

        if (cta.href !== undefined) {
            if (typeof cta.href !== 'string') {
                errors.push({
                    field: `${fieldPrefix}.href`,
                    message: `${displayName} href must be a string`,
                    userMessage: `Please enter a valid link for the ${displayName.toLowerCase()} button`
                });
            } else if (!isValidURL(cta.href) && !cta.href.startsWith('#') && !cta.href.startsWith('/')) {
                errors.push({
                    field: `${fieldPrefix}.href`,
                    message: `${displayName} href must be a valid URL or path`,
                    userMessage: `${displayName} button link should start with http://, https://, / or #`
                });
            }
        }

        if (cta.variant !== undefined && !['solid', 'outline'].includes(cta.variant)) {
            errors.push({
                field: `${fieldPrefix}.variant`,
                message: `${displayName} variant must be "solid" or "outline"`,
                userMessage: `${displayName} button style must be either solid or outline`
            });
        }

        if (cta.size !== undefined && !['sm', 'md', 'lg'].includes(cta.size)) {
            errors.push({
                field: `${fieldPrefix}.size`,
                message: `${displayName} size must be "sm", "md", or "lg"`,
                userMessage: `${displayName} button size must be small, medium, or large`
            });
        }
    };

    // Apply CTA validation
    validateCTA(props.primaryCTA, 'primaryCTA', 'Primary');
    validateCTA(props.secondaryCTA, 'secondaryCTA', 'Secondary');

    // 4. Image validation enhanced with alt text sanitization
    if (props.image !== undefined) {
        if (typeof props.image === 'string') {
            if (!isValidURL(props.image) && !props.image.startsWith('/')) {
                errors.push({
                    field: 'image',
                    message: 'Image URL must be a valid URL or path',
                    userMessage: 'Please provide a valid image URL or file path'
                });
            }
        } else if (typeof props.image === 'object' && props.image !== null) {
            const img = props.image as ImageAsset;

            if (!img.src || typeof img.src !== 'string') {
                errors.push({
                    field: 'image.src',
                    message: 'Image src is required and must be a string',
                    userMessage: 'Please provide an image source'
                });
            } else if (!isValidURL(img.src) && !img.src.startsWith('/')) {
                errors.push({
                    field: 'image.src',
                    message: 'Image src must be a valid URL or path',
                    userMessage: 'Please provide a valid image URL or file path'
                });
            }

            // Sanitize alt text
            if (img.alt !== undefined) {
                if (typeof img.alt !== 'string') {
                    errors.push({
                        field: 'image.alt',
                        message: 'Image alt must be a string',
                        userMessage: 'Please provide text description for the image'
                    });
                } else if (containsXSS(img.alt)) {
                    errors.push({
                        field: 'image.alt',
                        message: 'Image alt text contains potentially unsafe content',
                        userMessage: 'Image description contains invalid characters'
                    });
                }
            }

            if (img.width !== undefined && img.height !== undefined) {
                if (typeof img.width !== 'number' || typeof img.height !== 'number') {
                    errors.push({
                        field: 'image',
                        message: 'Image width and height must be numbers',
                        userMessage: 'Image dimensions must be numeric values'
                    });
                } else {
                    const aspectRatio = img.width / img.height;
                    if (aspectRatio < 0.5 || aspectRatio > 3.0) {
                        warnings.push(`Image proportions might look distorted (ideal range: 0.5-3.0, yours: ${aspectRatio.toFixed(2)})`);
                    }
                }
            }
        } else {
            errors.push({
                field: 'image',
                message: 'Image must be a string URL or ImageAsset object',
                userMessage: 'Please provide a valid image'
            });
        }
    }

    // 5. Enhanced color validation with strict type checking
    if (props.colors !== undefined) {
        if (typeof props.colors !== 'object' || props.colors === null) {
            errors.push({
                field: 'colors',
                message: 'Colors must be an object',
                userMessage: 'Color configuration is invalid'
            });
        } else {
            const validateColor = (color: any, path: string, displayPath: string) => {
                if (color === undefined) return;

                if (typeof color !== 'object' || color === null) {
                    errors.push({
                        field: path,
                        message: `${path} must be a ColorValue object`,
                        userMessage: `${displayPath} must have light and dark values`
                    });
                    return;
                }

                if (!('light' in color) || !('dark' in color)) {
                    errors.push({
                        field: path,
                        message: 'Color must have both light and dark values',
                        userMessage: `${displayPath} needs both light and dark mode colors`
                    });
                    return;
                }

                if (typeof color.light !== 'string' || !HEX_COLOR_PATTERN.test(color.light)) {
                    errors.push({
                        field: `${path}.light`,
                        message: `Must be a valid hex color (got: "${color.light}")`,
                        userMessage: `${displayPath} light color must be a hex code (e.g., #FFFFFF)`
                    });
                }

                if (typeof color.dark !== 'string' || !HEX_COLOR_PATTERN.test(color.dark)) {
                    errors.push({
                        field: `${path}.dark`,
                        message: `Must be a valid hex color (got: "${color.dark}")`,
                        userMessage: `${displayPath} dark color must be a hex code (e.g., #000000)`
                    });
                }
            };

            const validateButtonColors = (button: any, path: string, displayName: string) => {
                if (button === undefined) return;

                if (typeof button !== 'object' || button === null) {
                    errors.push({
                        field: path,
                        message: `${path} must be a button color object`,
                        userMessage: `${displayName} button colors are invalid`
                    });
                    return;
                }

                validateColor(button.background, `${path}.background`, `${displayName} background`);
                validateColor(button.text, `${path}.text`, `${displayName} text`);
                validateColor(button.border, `${path}.border`, `${displayName} border`);

                if (button.hover !== undefined) {
                    if (typeof button.hover !== 'object' || button.hover === null) {
                        errors.push({
                            field: `${path}.hover`,
                            message: 'Hover must be an object',
                            userMessage: `${displayName} hover colors are invalid`
                        });
                    } else {
                        validateColor(button.hover.background, `${path}.hover.background`, `${displayName} hover background`);
                        validateColor(button.hover.text, `${path}.hover.text`, `${displayName} hover text`);
                        validateColor(button.hover.border, `${path}.hover.border`, `${displayName} hover border`);
                    }
                }
            };

            validateColor(props.colors.background, 'colors.background', 'Background');
            validateColor(props.colors.title, 'colors.title', 'Title');
            validateColor(props.colors.description, 'colors.description', 'Description');
            validateButtonColors(props.colors.primaryButton, 'colors.primaryButton', 'Primary button');
            validateButtonColors(props.colors.secondaryButton, 'colors.secondaryButton', 'Secondary button');
        }
    }

    // 6. Animation validation
    if (props.animated !== undefined && typeof props.animated !== 'boolean') {
        errors.push({
            field: 'animated',
            message: 'Animated must be a boolean value',
            userMessage: 'Animation setting must be true or false'
        });
    }

    // 7. ClassName validation
    if (props.className !== undefined) {
        if (typeof props.className !== 'string') {
            errors.push({
                field: 'className',
                message: 'className must be a string',
                userMessage: 'Custom CSS classes must be text'
            });
        } else {
            if (containsXSS(props.className)) {
                errors.push({
                    field: 'className',
                    message: 'Custom className contains potentially unsafe content',
                    userMessage: 'Custom CSS classes contain invalid characters'
                });
            }

            if (!isValidClassName(props.className)) {
                warnings.push('Custom CSS classes contain unusual characters that might not work as expected');
            }

            if (props.className.length > 200) {
                warnings.push('Custom CSS classes seem very long - consider simplifying');
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings: warnings.length > 0 ? warnings : undefined
    };
}

// === Enhanced Sanitization ===
export function sanitizeProps(props: Hero_01Props): Hero_01Props {
    const sanitized = { ...props };

    if (sanitized.title) {
        sanitized.title = sanitizeHTML(sanitized.title).substring(0, 60);
    }

    if (sanitized.description) {
        sanitized.description = sanitizeHTML(sanitized.description).substring(0, 220);
    }

    if (sanitized.primaryCTA?.text) {
        sanitized.primaryCTA.text = sanitizeHTML(sanitized.primaryCTA.text).substring(0, 24);
    }

    if (sanitized.secondaryCTA?.text) {
        sanitized.secondaryCTA.text = sanitizeHTML(sanitized.secondaryCTA.text).substring(0, 24);
    }

    if (sanitized.image && typeof sanitized.image === 'object') {
        // Sanitize alt text
        if (sanitized.image.alt) {
            sanitized.image.alt = sanitizeHTML(sanitized.image.alt).substring(0, 125);
        }
    }

    if (sanitized.className) {
        // Remove dangerous patterns but keep valid CSS classes
        sanitized.className = sanitized.className
            .split(/\s+/)
            .filter(cls => isValidClassName(cls) && cls.length < 50)
            .join(' ')
            .substring(0, 200);
    }

    return sanitized;
}

// === Utility Functions ===
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    // Try to break at a word boundary
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.8) {
        return truncated.substring(0, lastSpace).trim();
    }

    return truncated.trim();
}

export function validateLayoutSafety(props: Hero_01Props): { safe: boolean; warnings: string[] } {
    const warnings: string[] = [];

    if (props.title && hasLongWords(props.title, 15)) {
        warnings.push('Title contains words that might not wrap nicely on small screens');
    }

    if (props.description && hasLongWords(props.description, 25)) {
        warnings.push('Description has very long words that could break the layout');
    }

    if (props.primaryCTA?.text && hasLongWords(props.primaryCTA.text, 12)) {
        warnings.push('Primary button text might be too wide on mobile');
    }

    if (props.secondaryCTA?.text && hasLongWords(props.secondaryCTA.text, 12)) {
        warnings.push('Secondary button text might be too wide on mobile');
    }

    return { safe: warnings.length === 0, warnings };
}

// === Export validation message formatter for better DX ===
export function formatValidationMessage(result: ValidationResult): string {
    if (result.valid) {
        return result.warnings?.length
            ? `✓ Valid with warnings:\n${result.warnings.map(w => `  ⚠ ${w}`).join('\n')}`
            : '✓ All props are valid';
    }

    const errorMessages = result.errors
        .map(e => `  ✗ ${e.userMessage || e.message}`)
        .join('\n');

    const warningMessages = result.warnings
        ? '\n\nWarnings:\n' + result.warnings.map(w => `  ⚠ ${w}`).join('\n')
        : '';

    return `Validation failed:\n${errorMessages}${warningMessages}`;
}