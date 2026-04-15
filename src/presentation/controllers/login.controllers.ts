import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserDTO } from "../../application/dtos/User.DTO.ts";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";
import { CreateUserUseCase } from "../../application/useCases/User/createUser.useCase.ts";

export async function createLoginController(
    req: FastifyRequest<{Body: CreateUserDTO}>,
    reply: FastifyReply
){
    try{
        const repository = new PrismaUserRepository();
        const useCase = new CreateUserUseCase(repository);
        const result = await useCase.execute(req.body);
        return reply.status(201).send(result);
    } catch(err: any) {
        return reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: err.message 
      });
    }
}