import { FastifyInstance } from "fastify";
import { prisma } from "../prismaClient.js";
import { CreateSubjectDTO } from "../models/Subjects.js";



interface SubjectParams {
  id: string;
}

export async function subjectRoutes(app: FastifyInstance) {

  // POST
  app.post<{ Body: CreateSubjectDTO }>("/cadastro", async (request, reply) => {

    const subject = await prisma.subject.create({
      data: request.body
    });

    return reply.code(201).send({
      mensagem: "Cadastro concluído!",
      disciplina: subject
    });
  });

  // GET
  app.get("/disciplinas", async () => {
    return prisma.subject.findMany();
  });

  // PUT
  app.put<{ Params: SubjectParams; Body: CreateSubjectDTO }>(
    "/editar/:id",
    async (request, reply) => {

      const id = Number(request.params.id);

      try {
        const updated = await prisma.subject.update({
          where: { id },
          data: request.body
        });

        return reply.send(updated);

      } catch {
        return reply.code(404).send({
          erro: "Disciplina não encontrada"
        });
      }
    }
  );

  // DELETE
  app.delete<{ Params: SubjectParams }>(
    "/disciplinas/:id",
    async (request, reply) => {

      const id = Number(request.params.id);

      try {
        await prisma.subject.delete({
          where: { id }
        });

        return reply.code(204).send();

      } catch {
        return reply.code(404).send({
          erro: "Disciplina não encontrada"
        });
      }
    }
  );
}


