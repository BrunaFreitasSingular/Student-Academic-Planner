import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStudentDTO } from "../../application/dtos/StudentDTO.ts";
import { CreateStudentUseCase } from "../../application/useCases/Student/createStudent.useCase.ts";
import { ListStudentUseCase } from "../../application/useCases/Student/listStudent.useCase.ts";
import { PrismaStudentRepository } from "../../infrastructure/database/repositories/PrismaStudentRepository.ts";
import { getStudentByIdUseCase } from "../../application/useCases/Student/getStudentById.useCase.ts";
import { loginStudentUseCase } from "../../application/useCases/Student/loginStudent.useCase.ts"

export async function createStudentController(
    req: FastifyRequest<{Body: CreateStudentDTO}>,
    reply: FastifyReply
){
    const repository = new PrismaStudentRepository();
    const useCase = new CreateStudentUseCase(repository);

    const result = useCase.execute(req.body);
    return reply.status(201).send(result);
}

export async function listStudentController(req: any, reply:any){
    const repository = new PrismaStudentRepository();
      const useCase = new ListStudentUseCase(repository);
    
      const result = await useCase.execute();
      return reply.send(result);
}

export async function getStudentByIdController(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {

  const repository = new PrismaStudentRepository();
  const useCase = new getStudentByIdUseCase(repository);
  const id = Number(req.params.id);

  const student = await useCase.execute(id);
  return reply.send(student);
}

export async function loginStudentController(
  req: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
){

  const repository = new PrismaStudentRepository();
  const useCase = new loginStudentUseCase(repository);

  const student = await useCase.execute(req.body.name);

  return reply.send(student);
}