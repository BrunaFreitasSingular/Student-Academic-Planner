import { FastifyInstance } from "fastify";
import * as SubjectControllers from "../controllers/subjects.controllers.js";

export async function subjectsRoutes(app: FastifyInstance) {
  app.post("/", SubjectControllers.createSubjectController);
  app.get("/", SubjectControllers.listSubjectsController);
  app.put("/:id", SubjectControllers.putSubjectController);
  app.delete("/:id", SubjectControllers.deleteSubjectController);
  app.patch("/:id", SubjectControllers.patchSubjectController);
  app.get("/subjects/:id", SubjectControllers.getSubjectByIdController);
  app.get(
    "/subjects/:id/concept",
    SubjectControllers.getSubjectConceptController,
  );
}
