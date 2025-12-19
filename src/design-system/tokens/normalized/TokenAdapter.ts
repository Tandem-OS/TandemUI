import {
  SEMANTIC_COLOR_MAP,
  PX_TO_SPACE_MAP,
  PX_TO_RADIUS_MAP,
} from "@/design-system/tokens/normalized/TokenMap";
import { TokenNormalizationError } from "@/design-system/tokens/normalized/Error";
import type { NormalizedTokens } from "@/design-system/tokens/normalized/NormalizedTokens";

const TOKEN_REF_REGEX = /^(color|typography|space|radius|border|shadow)\..+$/;

type SemanticInput = Record<string, any>;

function normalizeColor(value: string): string {
  if (SEMANTIC_COLOR_MAP[value]) {
    return SEMANTIC_COLOR_MAP[value];
  }

  throw new TokenNormalizationError(
    `Color value "${value}" cannot be normalized`
  );
}

function normalizeSpacing(value: string): string {
  if (PX_TO_SPACE_MAP[value]) {
    return PX_TO_SPACE_MAP[value];
  }

  throw new TokenNormalizationError(
    `Spacing value "${value}" cannot be normalized`
  );
}

function normalizeRadius(value: string): string {
  if (PX_TO_RADIUS_MAP[value]) {
    return PX_TO_RADIUS_MAP[value];
  }

  throw new TokenNormalizationError(
    `Radius value "${value}" cannot be normalized`
  );
}

function flatten(
  obj: Record<string, any>,
  prefix = "",
  acc: Record<string, any> = {}
): Record<string, any> {
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flatten(value, nextKey, acc);
    } else {
      const finalKey = nextKey.split(".").pop()!;

      if (acc[finalKey] !== undefined) {
        throw new TokenNormalizationError(
          `Duplicate token key "${finalKey}" after flattening`
        );
      }

      acc[finalKey] = value;
    }
  }

  return acc;
}

function normalizeTypography(value: string): string {
  const TYPOGRAPHY_MAP: Record<string, string> = {
    heading: "typography.heading.500",
    body: "typography.body.400",
  };

  if (TYPOGRAPHY_MAP[value]) {
    return TYPOGRAPHY_MAP[value];
  }

  throw new TokenNormalizationError(
    `Typography value "${value}" cannot be normalized`
  );
}

function normalizeBorder(value: string): string {
  const BORDER_MAP: Record<string, string> = {
    thin: "border.thin",
    thick: "border.thick",
  };

  if (BORDER_MAP[value]) {
    return BORDER_MAP[value];
  }

  throw new TokenNormalizationError(
    `Border value "${value}" cannot be normalized`
  );
}

function normalizeShadow(value: string): string {
  const SHADOW_MAP: Record<string, string> = {
    sm: "shadow.sm",
    md: "shadow.md",
    lg: "shadow.lg",
  };

  if (SHADOW_MAP[value]) {
    return SHADOW_MAP[value];
  }

  throw new TokenNormalizationError(
    `Shadow value "${value}" cannot be normalized`
  );
}

export function normalizeTokens(input: SemanticInput): NormalizedTokens {
  const output: NormalizedTokens = {};

  for (const [key, rawValue] of Object.entries(flatten(input))) {
    if (rawValue == null) continue;

    let normalizedValue: string;

    switch (key) {
      case "bg":
      case "background":
        normalizedValue = normalizeColor(rawValue);
        output.background = validateTokenRef(normalizedValue);
        break;

      case "color":
        normalizedValue = normalizeColor(rawValue);
        output.color = validateTokenRef(normalizedValue);
        break;

      case "padding":
      case "margin":
      case "gap":
        normalizedValue = normalizeSpacing(rawValue);
        output[key] = validateTokenRef(normalizedValue);
        break;

      case "radius":
      case "borderRadius":
        normalizedValue = normalizeRadius(rawValue);
        output.borderRadius = validateTokenRef(normalizedValue);
        break;

      case "typography":
        normalizedValue = normalizeTypography(rawValue);
        output.typography = validateTokenRef(normalizedValue);
        break;

      case "border":
        normalizedValue = normalizeBorder(rawValue);
        output.border = validateTokenRef(normalizedValue);
        break;

      case "shadow":
        normalizedValue = normalizeShadow(rawValue);
        output.shadow = validateTokenRef(normalizedValue);
        break;

      default:
        throw new TokenNormalizationError(
          `Unknown token key "${key}". No normalization rule defined.`
        );
    }
  }

  return output;
}

// Validates against backend TOKEN_REF_REGEX
function validateTokenRef(value: string): string {
  if (!TOKEN_REF_REGEX.test(value)) {
    throw new TokenNormalizationError(
      `Normalized token "${value}" does not match TOKEN_REF_REGEX`
    );
  }
  return value;
}
