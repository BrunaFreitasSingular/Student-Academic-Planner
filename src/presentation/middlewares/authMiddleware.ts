import type { FastifyReply, FastifyRequest } from "fastify";
import type { TokenVerifier } from "../../domain/services/TokenVerifier.ts";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export function authMiddleware(tokenVerifier: TokenVerifier) {
  return async function authenticate(
    req: FastifyRequest,
    reply: FastifyReply,
  ) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Token ausente ou malformado",
      });
    }

    const token = header.slice("Bearer ".length);

    try {
      const payload = tokenVerifier.verify(token);
      if (typeof payload.userId !== "string") {
        throw new Error("Token payload inválido");
      }
      req.userId = payload.userId;
    } catch {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Token inválido",
      });
    }
  };
}
