import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateSubjectDTO } from "../../domain/entities/Subjects.js";
import { CreateSubjectUseCase } from "../../application/useCases/createSubject.useCase.js";

import { ListSubjectsUseCase } from "../../application/useCases/listSubject.useCase.js";
import { UpdateSubjectUseCase } from "../../application/useCases/putSubject.useCase.js";
import { DeleteSubjectUseCase } from "../../application/useCases/deleteSubject.useCase.js";
import { PatchSubjectUseCase } from "../../application/useCases/patchSubject.useCase.js"


import { PrismaSubjectRepository } from "../../infrastructure/database/PrismaSubjectRepository.js";


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

  // Validação manual para garantir comportamento de PUT (substituição total)
  const { name, description, credits } = req.body;
  if (!name || !description || credits === undefined) {
    return reply.status(400).send({ 
      error: "Bad Request", 
      message: "Para atualização total (PUT), todos os campos (name, description, credits) são obrigatórios." 
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