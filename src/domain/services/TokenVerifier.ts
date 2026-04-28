export interface TokenVerifier {
  verify(token: string): Record<string, unknown>;
}
