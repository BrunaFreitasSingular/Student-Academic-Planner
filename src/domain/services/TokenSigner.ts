export interface TokenSigner {
  sign(payload: Record<string, unknown>): string;
}
