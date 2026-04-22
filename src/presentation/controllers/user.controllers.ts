import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";
import { ListUsersUseCase } from "../../application/useCases/User/listUsers.useCase.ts";
import {
  CreateUserUseCase,
  CreateUserDTO,
} from "../../application/useCases/User/createUser.useCase.ts";

export async function createUserController(
  req: FastifyRequest<{ Body: CreateUserDTO }>,
  reply: FastifyReply,
) {
  try {
    const repository = new PrismaUserRepository();
    const useCase = new CreateUserUseCase(repository);
    const result = await useCase.execute(req.body);
    return reply.status(201).send(result);
  } catch (err: any) {
    return reply.status(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: err.message,
    });
  }
}

export async function listUsersController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const repository = new PrismaUserRepository();
    const useCase = new ListUsersUseCase(repository);
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
