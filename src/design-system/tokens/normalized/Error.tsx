export class TokenNormalizationError extends Error {
  constructor(message: string) {
    super(`[TokenAdapter] ${message}`);
  }
}
