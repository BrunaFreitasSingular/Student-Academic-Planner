import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User.ts";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return reply.status(401).send({ error: "Token inválido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    request.user = decoded as User;
  } catch {
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
}
