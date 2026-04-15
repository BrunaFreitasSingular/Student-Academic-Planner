import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCourseDTO } from "../../application/dtos/CourseDTO.ts";
import { CreateCourseUseCase } from "../../application/useCases/Course/createCourse.useCase.ts";
import { PrismaCourseRepository } from "../../infrastructure/database/repositories/PrismaCourseRepository.ts";
import { ListCourseUseCase } from "../../application/useCases/Course/listCourse.useCase.ts";
import { getCourseByIdUseCase } from "../../application/useCases/Course/getCourseById.useCase.ts";

export async function createCourseController(
  req: FastifyRequest<{ Body: CreateCourseDTO }>,
  reply: FastifyReply,
) {
  const repository = new PrismaCourseRepository();
  const useCase = new CreateCourseUseCase(repository);

  const result = useCase.execute(req.body);
  return reply.status(201).send(result);
}

export async function listCourseController(req: any, reply: any) {
  const repository = new PrismaCourseRepository();
  const useCase = new ListCourseUseCase(repository);

  const result = await useCase.execute();

  return reply.send(result);
}

export async function getCourseByIdController(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const repository = new PrismaCourseRepository();
  const useCase = new getCourseByIdUseCase(repository);

  const id = Number(req.params.id);

  const student = await useCase.execute(id);

  return reply.send(student);
}
