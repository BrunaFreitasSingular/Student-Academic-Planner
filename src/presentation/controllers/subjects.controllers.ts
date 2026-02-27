import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateSubjectDTO } from "../../application/dtos/Subject.DTO/CreateSubjectDTO.ts";
import { CreateSubjectUseCase } from "../../application/useCases/createSubject.useCase.js";

import { ListSubjectsUseCase } from "../../application/useCases/listSubject.useCase.js";
import { UpdateSubjectUseCase } from "../../application/useCases/putSubject.useCase.js";
import { DeleteSubjectUseCase } from "../../application/useCases/deleteSubject.useCase.js";
import { PatchSubjectUseCase } from "../../application/useCases/patchSubject.useCase.js"

import type { CreateUserDTO } from "../../application/dtos/User.DTO/CreateUserDTO.ts";

import { PrismaSubjectRepository } from "../../infrastructure/database/repositories/PrismaSubjectRepository.ts";

import { client } from "../../infrastructure/database/Client.ts";

//criar usuario
export async function createUser(
  request: FastifyRequest<{Body: CreateUserDTO}>,
  reply: FastifyReply
) {
  const { id, name, course, semester } = request.body

  const result = await client.query(
    `INSERT INTO users (id, name, course, semester)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, name, course, semester]
  );

  return reply.status(201).send(result.rows[0]);
}

//criar disciplina
export async function createSubject(
  request: FastifyRequest<{Body: CreateSubjectDTO}>,
  reply: FastifyReply
) {
  const { name, credits, year, semester, status, id_user } = request.body

  const result = await client.query(
    `INSERT INTO subject (name, credits, year, semester, status, id_user)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, credits, year, semester, status, id_user]
  );

  return reply.status(201).send(result.rows[0]);
}

 //Buscar disciplinas de um usuário
export async function getUserSubjects(
  request: FastifyRequest<{Body: CreateSubjectDTO}>,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const result = await client.query(
    `SELECT u.name AS user_name,
            s.name AS subject_name,
            s.name
     FROM users u
     JOIN subject s ON u.id = s.id_user
     WHERE u.id = $1`,
    [Number(id)]
  );

  return reply.send(result.rows);
}

 //Buscar disciplinas de um usuário
export async function getUserbyId(
  request: FastifyRequest<{Body: CreateUserDTO}>,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const result = await client.query(
    `SELECT *
     FROM users u
     WHERE u.id = $1`,
    [Number(id)]
  );

  return reply.send(result.rows);
}


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
//importar o client
//===========================================================
  // fazer as client.query('SELECT * from users);


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