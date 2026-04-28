import type { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersUseCase } from "../../application/useCases/User/listUsers.useCase.ts";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";

export async function listUsersController(
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const useCase = new ListUsersUseCase(new PrismaUserRepository());
    const result = await useCase.execute();
    return reply.status(200).send(result);
  } catch (err: any) {
    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: err.message,
    });
  }
}
