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

// === Main Validation Function ===
export function validateHero01Props(props: Hero_01Props): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    // 1. Title validation with XSS protection
    if (props.title) {
        if (props.title.length > 60) {
            errors.push({
                field: 'title',
                message: `Title must be 60 characters or less (current: ${props.title.length})`
            });
        }
        
        if (containsXSS(props.title)) {
            errors.push({
                field: 'title',
                message: 'Title contains potentially unsafe content'
            });
        }
        
        if (hasLongWords(props.title, 15)) {
            warnings.push('Title contains very long words that may not wrap properly on mobile');
        }
    }

    // 2. Description validation with XSS protection
    if (props.description) {
        if (props.description.length > 220) {
            errors.push({
                field: 'description',
                message: `Description must be 220 characters or less (current: ${props.description.length})`
            });
        }
        
        if (containsXSS(props.description)) {
            errors.push({
                field: 'description',
                message: 'Description contains potentially unsafe content'
            });
        }
        
        if (hasLongWords(props.description, 20)) {
            warnings.push('Description contains very long words that may cause layout issues');
        }
    }

    // 3. Primary CTA validation enhanced
    if (props.primaryCTA) {
        if (props.primaryCTA.text) {
            if (props.primaryCTA.text.length > 24) {
                errors.push({
                    field: 'primaryCTA.text',
                    message: `Primary CTA text must be 24 characters or less (current: ${props.primaryCTA.text.length})`
                });
            }
            
            if (containsXSS(props.primaryCTA.text)) {
                errors.push({
                    field: 'primaryCTA.text',
                    message: 'Primary CTA text contains potentially unsafe content'
                });
            }
        }

        if (props.primaryCTA.href && !isValidURL(props.primaryCTA.href)) {
            errors.push({
                field: 'primaryCTA.href',
                message: 'Primary CTA href must be a valid URL'
            });
        }

        if (props.primaryCTA.variant && !['solid', 'outline'].includes(props.primaryCTA.variant)) {
            errors.push({
                field: 'primaryCTA.variant',
                message: 'Primary CTA variant must be "solid" or "outline"'
            });
        }

        if (props.primaryCTA.size && !['sm', 'md', 'lg'].includes(props.primaryCTA.size)) {
            errors.push({
                field: 'primaryCTA.size',
                message: 'Primary CTA size must be "sm", "md", or "lg"'
            });
        }
    }

    // 4. Secondary CTA validation enhanced
    if (props.secondaryCTA) {
        if (props.secondaryCTA.text) {
            if (props.secondaryCTA.text.length > 24) {
                errors.push({
                    field: 'secondaryCTA.text',
                    message: `Secondary CTA text must be 24 characters or less (current: ${props.secondaryCTA.text.length})`
                });
            }
            
            if (containsXSS(props.secondaryCTA.text)) {
                errors.push({
                    field: 'secondaryCTA.text',
                    message: 'Secondary CTA text contains potentially unsafe content'
                });
            }
        }

        if (props.secondaryCTA.href && !isValidURL(props.secondaryCTA.href)) {
            errors.push({
                field: 'secondaryCTA.href',
                message: 'Secondary CTA href must be a valid URL'
            });
        }

        if (props.secondaryCTA.variant && !['solid', 'outline'].includes(props.secondaryCTA.variant)) {
            errors.push({
                field: 'secondaryCTA.variant',
                message: 'Secondary CTA variant must be "solid" or "outline"'
            });
        }

        if (props.secondaryCTA.size && !['sm', 'md', 'lg'].includes(props.secondaryCTA.size)) {
            errors.push({
                field: 'secondaryCTA.size',
                message: 'Secondary CTA size must be "sm", "md", or "lg"'
            });
        }
    }

    // 5. Image validation enhanced
    if (props.image) {
        if (typeof props.image === 'string') {
            if (!isValidURL(props.image)) {
                errors.push({
                    field: 'image',
                    message: 'Image URL must be a valid URL'
                });
            }
        } else {
            const img = props.image as ImageAsset;
            
            if (!isValidURL(img.src)) {
                errors.push({
                    field: 'image.src',
                    message: 'Image src must be a valid URL'
                });
            }
            
            if (img.alt && containsXSS(img.alt)) {
                errors.push({
                    field: 'image.alt',
                    message: 'Image alt text contains potentially unsafe content'
                });
            }
            
            if (img.width && img.height) {
                const aspectRatio = img.width / img.height;
                if (aspectRatio < 0.5 || aspectRatio > 3.0) {
                    warnings.push(`Image aspect ratio (${aspectRatio.toFixed(2)}) is outside recommended range (0.5-3.0)`);
                }
            }
        }
    }

    // 6. Enhanced color validation
    if (props.colors) {
        const validateColor = (color: any, path: string) => {
            if (color && typeof color === 'object') {
                if (!color.light || !color.dark) {
                    errors.push({
                        field: path,
                        message: 'Color must have both light and dark values'
                    });
                } else {
                    if (!HEX_COLOR_PATTERN.test(color.light)) {
                        errors.push({
                            field: `${path}.light`,
                            message: `Must be a valid hex color (got: "${color.light}")`
                        });
                    }
                    if (!HEX_COLOR_PATTERN.test(color.dark)) {
                        errors.push({
                            field: `${path}.dark`,
                            message: `Must be a valid hex color (got: "${color.dark}")`
                        });
                    }
                }
            }
        };

        validateColor(props.colors.background, 'colors.background');
        validateColor(props.colors.title, 'colors.title');
        validateColor(props.colors.description, 'colors.description');

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

    // 7. Animation and className validation
    if (props.animated !== undefined && typeof props.animated !== 'boolean') {
        errors.push({
            field: 'animated',
            message: 'Animated must be a boolean value'
        });
    }

    if (props.className && containsXSS(props.className)) {
        errors.push({
            field: 'className',
            message: 'Custom className contains potentially unsafe content'
        });
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
        if (sanitized.image.alt) {
            sanitized.image.alt = sanitizeHTML(sanitized.image.alt);
        }
    }

    if (sanitized.className) {
        sanitized.className = sanitized.className.replace(DANGEROUS_PATTERNS[0], '');
    }

    return sanitized;
}

// === Utility Functions ===
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim();
}

export function validateLayoutSafety(props: Hero_01Props): { safe: boolean; warnings: string[] } {
    const warnings: string[] = [];
    
    if (props.title && hasLongWords(props.title, 15)) {
        warnings.push('Title contains words longer than 15 characters that may not wrap properly');
    }
    
    if (props.description && hasLongWords(props.description, 25)) {
        warnings.push('Description contains words longer than 25 characters that may cause layout issues');
    }
    
    return { safe: warnings.length === 0, warnings };
}