import type { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateUserUseCase,
  type CreateUserDTO,
} from "../../application/useCases/User/createUser.useCase.ts";
import { LoginUseCase } from "../../application/useCases/Auth/login.useCase.ts";
import type { LoginUserDTO } from "../../application/dtos/Login.DTO.ts";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";
import { BcryptPasswordHasher } from "../../infrastructure/auth/BcryptPasswordHasher.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function loginController(
  req: FastifyRequest<{ Body: LoginUserDTO }>,
  reply: FastifyReply,
) {
  try {
    const useCase = new LoginUseCase(
      new PrismaUserRepository(),
      new BcryptPasswordHasher(),
      new JwtTokenService(process.env.JWT_SECRET!),
    );
    const result = await useCase.execute(req.body);
    return reply.status(200).send(result);
  } catch (err: any) {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: err.message,
    });
  }
}

export async function registerController(
  req: FastifyRequest<{ Body: CreateUserDTO }>,
  reply: FastifyReply,
) {
  try {
    const useCase = new CreateUserUseCase(
      new PrismaUserRepository(),
      new BcryptPasswordHasher(),
    );
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
