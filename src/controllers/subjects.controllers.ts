import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateSubjectDTO, UpdateSubjectDTO } from "../models/Subjects.js";
import * as subjectsService from "../services/subjects.service.js";

type SubjectParams = { id: string };
type StatusBody = { status: string };


// POST /
export async function create(
  request: FastifyRequest<{ Body: CreateSubjectDTO }>,
  reply: FastifyReply
) {
  const subject = await subjectsService.createSubject(request.body);

  return reply.code(201).send({
    mensagem: "Cadastro concluído!",
    disciplina: subject
  });
}

// GET /
export async function list(_: FastifyRequest, reply: FastifyReply) {
  const subjects = await subjectsService.listSubjects();
  return reply.send(subjects);
}

// PUT /:id
export async function put(
  request: FastifyRequest<{ Params: SubjectParams; Body: CreateSubjectDTO }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  try {
    const updated = await subjectsService.updateSubject(id, request.body);
    return reply.send(updated);
  } catch {
    return reply.code(404).send({ erro: "Disciplina não encontrada" });
  }
}

// PATCH /:id 
export async function patch(
  request: FastifyRequest<{ Params: SubjectParams; Body: UpdateSubjectDTO }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  try {
    const updated = await subjectsService.patchSubject(id, request.body);
    return reply.send(updated);
  } catch {
    return reply.code(404).send({ erro: "Disciplina não encontrada" });
  }
}

// DELETE /:id
export async function remove(
  request: FastifyRequest<{ Params: SubjectParams }>,
  reply: FastifyReply
) {
  const id = Number(request.params.id);

  try {
    await subjectsService.deleteSubject(id);
    return reply.code(204).send();
  } catch {
    return reply.code(404).send({ erro: "Disciplina não encontrada" });
  }
}
