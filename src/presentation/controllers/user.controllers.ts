import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDTO } from "../../application/dtos/UserDTO.ts";
import { CreateUserUseCase } from "../../application/useCases/Users/createUser.useCase.ts";
import { ListUserUseCase } from "../../application/useCases/Users/listUser.useCase.ts";
import { PrismaUserRepository } from "../../infrastructure/database/repositories/PrismaUserRepository.ts";
import { getUserByIdUseCase } from "../../application/useCases/Users/getUserById.useCase.ts";

export async function createUserController(
    req: FastifyRequest<{Body: CreateUserDTO}>,
    reply: FastifyReply
){
    console.log(req.body)
    const repository = new PrismaUserRepository();
    const useCase = new CreateUserUseCase(repository);

    const result = useCase.execute(req.body);
    return reply.status(201).send(result);
}

export async function listUserController(req: any, reply:any){
    const repository = new PrismaUserRepository();
      const useCase = new ListUserUseCase(repository);
    
      const result = await useCase.execute();
    
      return reply.send(result);
}

export async function getUserByIdController(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {

  const repository = new PrismaUserRepository();
  const useCase = new getUserByIdUseCase(repository);

  const id = Number(req.params.id);

  const user = await useCase.execute(id);

  return reply.send(user);
}