import jwt, { type SignOptions } from "jsonwebtoken";
import type { TokenSigner } from "../../domain/services/TokenSigner.ts";
import type { TokenVerifier } from "../../domain/services/TokenVerifier.ts";

export class JwtTokenService implements TokenSigner, TokenVerifier {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: SignOptions["expiresIn"] = "7d",
  ) {}

  sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): Record<string, unknown> {
    const payload = jwt.verify(token, this.secret);
    if (typeof payload === "string") {
      throw new Error("Token payload inválido");
    }
    return payload as Record<string, unknown>;
  }
}
