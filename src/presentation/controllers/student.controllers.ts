import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStudentDTO } from "../../application/dtos/StudentDTO.ts";
import { CreateStudentUseCase } from "../../application/useCases/Student/createStudent.useCase.ts";
import { ListStudentUseCase } from "../../application/useCases/Student/listStudent.useCase.ts";
import { PrismaStudentRepository } from "../../infrastructure/database/repositories/PrismaStudentRepository.ts";
import { getStudentByIdUseCase } from "../../application/useCases/Student/getStudentById.useCase.ts";
import { GetStudentByUserIdUseCase } from "../../application/useCases/Student/getStudentByUserId.useCase.ts";

export async function createStudentController(
  req: FastifyRequest<{ Body: CreateStudentDTO }>,
  reply: FastifyReply,
) {
  try {
    const repository = new PrismaStudentRepository();
    const useCase = new CreateStudentUseCase(repository);

    const result = await useCase.execute(req.body);

    return reply.status(201).send({
      id: result.id,
      name: result.name,
      user_id: result.user_id,
      course_id: result.course_id,
      semester: result.semester,
    });
  } catch (err: any) {
    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

export async function listStudentController(
  req: FastifyRequest<{ Querystring: { user_id?: string } }>,
  reply: FastifyReply,
) {
  const repository = new PrismaStudentRepository();

  if (req.query.user_id) {
    try {
      const useCase = new GetStudentByUserIdUseCase(repository);
      const student = await useCase.execute(req.query.user_id);
      return reply.send(student);
    } catch (err: any) {
      return reply.status(404).send({
        statusCode: 404,
        error: "Not Found",
        message: err.message,
      });
    }
  }

  const useCase = new ListStudentUseCase(repository);
  const result = await useCase.execute();
  return reply.send(result);
}

export async function getStudentByIdController(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const repository = new PrismaStudentRepository();
  const useCase = new getStudentByIdUseCase(repository);
  const id = Number(req.params.id);

  const student = await useCase.execute(id);
  return reply.send(student);
}
