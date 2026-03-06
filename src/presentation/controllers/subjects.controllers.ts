import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateSubjectDTO } from "../../application/dtos/SubjectDTO.ts";
import { CreateSubjectUseCase } from "../../application/useCases/Subjects/createSubject.useCase.js";
import { ListSubjectsUseCase } from "../../application/useCases/Subjects/listSubject.useCase.js";
import { UpdateSubjectUseCase } from "../../application/useCases/Subjects/putSubject.useCase.js";
import { DeleteSubjectUseCase } from "../../application/useCases/Subjects/deleteSubject.useCase.js";
import { PatchSubjectUseCase } from "../../application/useCases/Subjects/patchSubject.useCase.ts"
import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.js";


export async function createSubjectController(
  req: FastifyRequest<{ Body: CreateSubjectDTO }>, 
  reply: FastifyReply
) {

  const repository = new PrismaSubjectRepository();
  const useCase = new CreateSubjectUseCase(repository);

  const result = await useCase.execute(req.body);

  return reply.status(201).send(result);
}

export async function listSubjectsController(req: any, reply: any) {

  const repository = new PrismaSubjectRepository();
  const useCase = new ListSubjectsUseCase(repository);

  const result = await useCase.execute();

  return reply.send(result);
}

export async function putSubjectController(req: any, reply: any) {

  const repository = new PrismaSubjectRepository();
  const useCase = new UpdateSubjectUseCase(repository);

  const { name, credits, year, semester, status, id_user } = req.body;

  if (!name || credits === undefined || !year || !semester || !status || !id_user) {
    return reply.status(400).send({
      error: "Bad Request",
      message: "Todos os campos são obrigatórios para PUT."
    });
  }

  const result = await useCase.execute(Number(req.params.id), req.body);

  return reply.send(result);
}


export async function deleteSubjectController(req: any, reply: any) {

  const repository = new PrismaSubjectRepository();
  const useCase = new DeleteSubjectUseCase(repository);

  await useCase.execute(Number(req.params.id));

  return reply.status(204).send();
}

export async function patchSubjectController(req: any, reply: any) {

  const repository = new PrismaSubjectRepository();
  const useCase = new PatchSubjectUseCase(repository);

  const result = await useCase.execute(
    Number(req.params.id),
    req.body
  );

  return reply.send(result);
}