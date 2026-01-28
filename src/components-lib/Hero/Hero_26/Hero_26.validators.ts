// Hero_26.validators.ts
import { type Hero_26Props } from './Hero_26.types';

export interface ValidationError {
    field: string;
    message: string;
    userMessage?: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings?: string[];
}

// === Constants ===
const LIMITS = {
    TITLE_MAX: 80,
    DESCRIPTION_MAX: 300,
    NEWSLETTER_PLACEHOLDER_MAX: 50,
    NEWSLETTER_BUTTON_TEXT_MAX: 24,
    NEWSLETTER_MESSAGE_MAX: 150,
    CLASSNAME_MAX: 200,
    CLASSNAME_PART_MAX: 50,
    WORD_LENGTH_WARNING_TITLE: 15,
    WORD_LENGTH_WARNING_DESCRIPTION: 20,
    WORD_LENGTH_WARNING_NEWSLETTER: 12,
    VIDEO_URL_MAX: 500,
    ASPECT_RATIO_MIN: 0.5,
    ASPECT_RATIO_MAX: 4.0,
    ASPECT_RATIO_THRESHOLD: 0.8
} as const;

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
const RGBA_COLOR_PATTERN = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[01]?(?:\.\d+)?)?\s*\)$/;
const SAFE_CLASS_PATTERN = /^[a-zA-Z0-9\s\-_:]+$/;
const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|avi|mov|wmv|flv|m4v)$/i;

const PATTERNS = {
    dangerous: DANGEROUS_PATTERNS,
    hexColor: HEX_COLOR_PATTERN,
    rgbaColor: RGBA_COLOR_PATTERN,
    safeClass: SAFE_CLASS_PATTERN,
    video: VIDEO_EXTENSIONS
} as const;

// === Type Guards ===
const isColorValue = (color: unknown): color is Record<string, unknown> => {
    return typeof color === 'object' && color !== null && 'light' in color && 'dark' in color;
};

// === Security Functions ===
export function containsXSS(text: string): boolean {
    return PATTERNS.dangerous.some(pattern => pattern.test(text));
}

export function isValidURL(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:', 'mailto:', 'tel:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}

export function isValidVideoURL(url: string): boolean {
    if (!isValidURL(url) && !url.startsWith('/')) return false;
    return PATTERNS.video.test(url) || url.includes('video') || url.startsWith('/');
}

export function isValidColor(color: string): boolean {
    return PATTERNS.hexColor.test(color) || 
           PATTERNS.rgbaColor.test(color) || 
           color === 'transparent';
}

export function hasLongWords(text: string, maxWordLength: number = 20): boolean {
    const words = text.split(/\s+/);
    return words.some(word => word.length > maxWordLength);
}

export function sanitizeHTML(html: string): string {
    let sanitized = html;
    PATTERNS.dangerous.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });

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
    return PATTERNS.safeClass.test(className);
}

// === Common Validation Helper ===
const validateStringField = (
    value: unknown,
    fieldName: string,
    displayName: string,
    maxLength: number,
    errors: ValidationError[]
): string | undefined => {
    if (typeof value !== 'string') {
        errors.push({
            field: fieldName,
            message: `${displayName} must be a string`,
            userMessage: `Please enter text for the ${displayName.toLowerCase()}`
        });
        return undefined;
    }

    if (value.length > maxLength) {
        errors.push({
            field: fieldName,
            message: `${displayName} must be ${maxLength} characters or less (current: ${value.length})`,
            userMessage: `${displayName} is too long. Please shorten to ${maxLength} characters (you have ${value.length})`
        });
    }

    if (containsXSS(value)) {
        errors.push({
            field: fieldName,
            message: `${displayName} contains potentially unsafe content`,
            userMessage: `${displayName} contains invalid characters. Please use only plain text.`
        });
    }

    return value;
};

// === Main Validation Function ===
export function validateHero26Props(props: Hero_26Props): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    // 1. Title validation
    if (props.title !== undefined) {
        const titleStr = validateStringField(props.title, 'title', 'Title', LIMITS.TITLE_MAX, errors);
        if (titleStr && hasLongWords(titleStr, LIMITS.WORD_LENGTH_WARNING_TITLE)) {
            warnings.push('Title has long words that might look awkward on mobile screens');
        }
    }

    // 2. Description validation
    if (props.description !== undefined) {
        const descStr = validateStringField(props.description, 'description', 'Description', LIMITS.DESCRIPTION_MAX, errors);
        if (descStr && hasLongWords(descStr, LIMITS.WORD_LENGTH_WARNING_DESCRIPTION)) {
            warnings.push('Description has very long words that might affect layout');
        }
    }

    // 3. Newsletter field validations
    if (props.newsletterPlaceholder !== undefined) {
        validateStringField(props.newsletterPlaceholder, 'newsletterPlaceholder', 'Newsletter placeholder', LIMITS.NEWSLETTER_PLACEHOLDER_MAX, errors);
    }

    if (props.newsletterButtonText !== undefined) {
        const buttonStr = validateStringField(props.newsletterButtonText, 'newsletterButtonText', 'Newsletter button text', LIMITS.NEWSLETTER_BUTTON_TEXT_MAX, errors);
        if (buttonStr && hasLongWords(buttonStr, LIMITS.WORD_LENGTH_WARNING_NEWSLETTER)) {
            warnings.push('Newsletter button text might be too wide on mobile');
        }
    }

    if (props.newsletterMessage !== undefined) {
        validateStringField(props.newsletterMessage, 'newsletterMessage', 'Newsletter message', LIMITS.NEWSLETTER_MESSAGE_MAX, errors);
    }

    // 4. Video source validation
    if (props.videoSrc !== undefined) {
        if (typeof props.videoSrc !== 'string') {
            errors.push({
                field: 'videoSrc',
                message: 'Video source must be a string',
                userMessage: 'Please provide a valid video URL or file path'
            });
        } else {
            if (props.videoSrc.length > LIMITS.VIDEO_URL_MAX) {
                errors.push({
                    field: 'videoSrc',
                    message: `Video source URL is too long (max: ${LIMITS.VIDEO_URL_MAX})`,
                    userMessage: 'Video URL is too long. Please use a shorter URL or CDN.'
                });
            }

            if (!isValidVideoURL(props.videoSrc)) {
                errors.push({
                    field: 'videoSrc',
                    message: 'Video source must be a valid video URL or path',
                    userMessage: 'Please provide a valid video file (.mp4, .webm, etc.)'
                });
            }

            if (containsXSS(props.videoSrc)) {
                errors.push({
                    field: 'videoSrc',
                    message: 'Video source contains potentially unsafe content',
                    userMessage: 'Video URL contains invalid characters'
                });
            }
        }
    }

    // 5. Video thumbnail validation
    if (props.videoThumbnail !== undefined) {
        if (typeof props.videoThumbnail !== 'string') {
            errors.push({
                field: 'videoThumbnail',
                message: 'Video thumbnail must be a string',
                userMessage: 'Please provide a valid thumbnail image URL or path'
            });
        } else {
            if (props.videoThumbnail.length > LIMITS.VIDEO_URL_MAX) {
                errors.push({
                    field: 'videoThumbnail',
                    message: `Video thumbnail URL is too long (max: ${LIMITS.VIDEO_URL_MAX})`,
                    userMessage: 'Video thumbnail URL is too long. Please use a shorter URL.'
                });
            }

            if (!isValidURL(props.videoThumbnail) && !props.videoThumbnail.startsWith('/')) {
                errors.push({
                    field: 'videoThumbnail',
                    message: 'Video thumbnail must be a valid URL or path',
                    userMessage: 'Please provide a valid thumbnail image URL or file path'
                });
            }

            if (containsXSS(props.videoThumbnail)) {
                errors.push({
                    field: 'videoThumbnail',
                    message: 'Video thumbnail contains potentially unsafe content',
                    userMessage: 'Video thumbnail URL contains invalid characters'
                });
            }
        }
    }

    // 6. Video boolean validations
    if (props.videoAutoPlay !== undefined && typeof props.videoAutoPlay !== 'boolean') {
        errors.push({
            field: 'videoAutoPlay',
            message: 'Video autoPlay must be a boolean value',
            userMessage: 'Video autoPlay setting must be true or false'
        });
    }

    if (props.videoLoop !== undefined && typeof props.videoLoop !== 'boolean') {
        errors.push({
            field: 'videoLoop',
            message: 'Video loop must be a boolean value',
            userMessage: 'Video loop setting must be true or false'
        });
    }

    // 7. Enhanced color validation
    if (props.colors !== undefined) {
        if (typeof props.colors !== 'object' || props.colors === null) {
            errors.push({
                field: 'colors',
                message: 'Colors must be an object',
                userMessage: 'Color configuration is invalid'
            });
        } else {
            const validateColor = (color: unknown, path: string, displayPath: string) => {
                if (color === undefined) return;

                if (!isColorValue(color)) {
                    errors.push({
                        field: path,
                        message: `${path} must be a ColorValue object`,
                        userMessage: `${displayPath} must have light and dark values`
                    });
                    return;
                }

                const colorObj = color;

                if (typeof colorObj.light !== 'string' || !isValidColor(colorObj.light as string)) {
                    if (path.includes('overlay') && (colorObj.light as string).startsWith('rgba(')) {
                        return;
                    }
                    errors.push({
                        field: `${path}.light`,
                        message: `Must be a valid color (got: "${colorObj.light}")`,
                        userMessage: `${displayPath} light color must be a hex code (e.g., #FFFFFF) or rgba value`
                    });
                }

                if (typeof colorObj.dark !== 'string' || !isValidColor(colorObj.dark as string)) {
                    errors.push({
                        field: `${path}.dark`,
                        message: `Must be a valid color (got: "${colorObj.dark}")`,
                        userMessage: `${displayPath} dark color must be a hex code (e.g., #000000) or rgba value`
                    });
                }
            };

            const validateNewsletterColors = (newsletter: unknown, path: string) => {
                if (newsletter === undefined) return;

                if (typeof newsletter !== 'object' || newsletter === null) {
                    errors.push({
                        field: path,
                        message: `${path} must be a newsletter color object`,
                        userMessage: `Newsletter colors are invalid`
                    });
                    return;
                }

                const newsletterObj = newsletter as Record<string, unknown>;

                // Validate input colors
                if (newsletterObj.input && typeof newsletterObj.input === 'object') {
                    const inputObj = newsletterObj.input as Record<string, unknown>;
                    validateColor(inputObj.background, `${path}.input.background`, 'Newsletter input background');
                    validateColor(inputObj.text, `${path}.input.text`, 'Newsletter input text');
                    validateColor(inputObj.border, `${path}.input.border`, 'Newsletter input border');
                    validateColor(inputObj.focusBorder, `${path}.input.focusBorder`, 'Newsletter input focus border');
                    validateColor(inputObj.placeholder, `${path}.input.placeholder`, 'Newsletter input placeholder');
                }

                // Validate button colors
                if (newsletterObj.button && typeof newsletterObj.button === 'object') {
                    const buttonObj = newsletterObj.button as Record<string, unknown>;
                    validateColor(buttonObj.background, `${path}.button.background`, 'Newsletter button background');
                    validateColor(buttonObj.text, `${path}.button.text`, 'Newsletter button text');
                    validateColor(buttonObj.border, `${path}.button.border`, 'Newsletter button border');

                    if (buttonObj.hover && typeof buttonObj.hover === 'object') {
                        const hoverObj = buttonObj.hover as Record<string, unknown>;
                        validateColor(hoverObj.background, `${path}.button.hover.background`, 'Newsletter button hover background');
                        validateColor(hoverObj.text, `${path}.button.hover.text`, 'Newsletter button hover text');
                        validateColor(hoverObj.border, `${path}.button.hover.border`, 'Newsletter button hover border');
                    }
                }

                // Validate message color
                validateColor(newsletterObj.message, `${path}.message`, 'Newsletter message');
            };

            const validateVideoColors = (video: unknown, path: string) => {
                if (video === undefined) return;

                if (typeof video !== 'object' || video === null) {
                    errors.push({
                        field: path,
                        message: `${path} must be a video color object`,
                        userMessage: `Video colors are invalid`
                    });
                    return;
                }

                const videoObj = video as Record<string, unknown>;

                validateColor(videoObj.overlay, `${path}.overlay`, 'Video overlay');

                if (videoObj.playButton && typeof videoObj.playButton === 'object') {
                    const playButtonObj = videoObj.playButton as Record<string, unknown>;
                    validateColor(playButtonObj.background, `${path}.playButton.background`, 'Video play button background');
                    validateColor(playButtonObj.backgroundHover, `${path}.playButton.backgroundHover`, 'Video play button hover background');
                    validateColor(playButtonObj.border, `${path}.playButton.border`, 'Video play button border');
                    validateColor(playButtonObj.icon, `${path}.playButton.icon`, 'Video play button icon');
                    validateColor(playButtonObj.iconHover, `${path}.playButton.iconHover`, 'Video play button icon hover');
                }
            };

            validateColor(props.colors.background, 'colors.background', 'Background');
            validateColor(props.colors.title, 'colors.title', 'Title');
            validateColor(props.colors.description, 'colors.description', 'Description');
            validateNewsletterColors(props.colors.newsletter, 'colors.newsletter');
            validateVideoColors(props.colors.video, 'colors.video');
        }
    }

    // 8. Animation validation
    if (props.animated !== undefined && typeof props.animated !== 'boolean') {
        errors.push({
            field: 'animated',
            message: 'Animated must be a boolean value',
            userMessage: 'Animation setting must be true or false'
        });
    }

    // 9. ClassName validation
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

            if (props.className.length > LIMITS.CLASSNAME_MAX) {
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
export function sanitizeProps(props: Hero_26Props): Hero_26Props {
    const sanitized = { ...props };

    if (sanitized.title) {
        sanitized.title = sanitizeHTML(sanitized.title).substring(0, LIMITS.TITLE_MAX);
    }

    if (sanitized.description) {
        sanitized.description = sanitizeHTML(sanitized.description).substring(0, LIMITS.DESCRIPTION_MAX);
    }

    if (sanitized.newsletterPlaceholder) {
        sanitized.newsletterPlaceholder = sanitizeHTML(sanitized.newsletterPlaceholder).substring(0, LIMITS.NEWSLETTER_PLACEHOLDER_MAX);
    }

    if (sanitized.newsletterButtonText) {
        sanitized.newsletterButtonText = sanitizeHTML(sanitized.newsletterButtonText).substring(0, LIMITS.NEWSLETTER_BUTTON_TEXT_MAX);
    }

    if (sanitized.newsletterMessage) {
        sanitized.newsletterMessage = sanitizeHTML(sanitized.newsletterMessage).substring(0, LIMITS.NEWSLETTER_MESSAGE_MAX);
    }

    if (sanitized.videoSrc) {
        sanitized.videoSrc = sanitized.videoSrc.substring(0, LIMITS.VIDEO_URL_MAX);
    }

    if (sanitized.videoThumbnail) {
        sanitized.videoThumbnail = sanitized.videoThumbnail.substring(0, LIMITS.VIDEO_URL_MAX);
    }

    if (sanitized.className) {
        sanitized.className = sanitized.className
            .split(/\s+/)
            .filter(cls => isValidClassName(cls) && cls.length < LIMITS.CLASSNAME_PART_MAX)
            .join(' ')
            .substring(0, LIMITS.CLASSNAME_MAX);
    }

    return sanitized;
}

// === Utility Functions ===
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * LIMITS.ASPECT_RATIO_THRESHOLD) {
        return truncated.substring(0, lastSpace).trim();
    }

    return truncated.trim();
}

export function validateLayoutSafety(props: Hero_26Props): { safe: boolean; warnings: string[] } {
    const warnings: string[] = [];

    if (props.title && hasLongWords(props.title, LIMITS.WORD_LENGTH_WARNING_TITLE)) {
        warnings.push('Title contains words that might not wrap nicely on small screens');
    }

    if (props.description && hasLongWords(props.description, LIMITS.WORD_LENGTH_WARNING_DESCRIPTION)) {
        warnings.push('Description has very long words that could break the layout');
    }

    if (props.newsletterButtonText && hasLongWords(props.newsletterButtonText, LIMITS.WORD_LENGTH_WARNING_NEWSLETTER)) {
        warnings.push('Newsletter button text might be too wide on mobile');
    }

    if (props.videoSrc && props.videoSrc.length > 200) {
        warnings.push('Video URL is very long - consider using a CDN or shorter URL');
    }

    return { safe: warnings.length === 0, warnings };
}

// === Export validation message formatter ===
export function formatValidationMessage(result: ValidationResult): string {
    if (result.valid) {
        return result.warnings?.length
            ? `✅ Valid with warnings:\n${result.warnings.map(w => `  ⚠️ ${w}`).join('\n')}`
            : '✅ All props are valid';
    }

    const errorMessages = result.errors
        .map(e => `  ❌ ${e.userMessage || e.message}`)
        .join('\n');

    const warningMessages = result.warnings
        ? '\n\nWarnings:\n' + result.warnings.map(w => `  ⚠️ ${w}`).join('\n')
        : '';

    return `Validation failed:\n${errorMessages}${warningMessages}`;
}