import type { FastifyInstance } from "fastify";
import * as subjectsController from "../presentation/controllers/subjects.controllers.js";

export async function subjectRoutes(app: FastifyInstance) {

  // CRUD
  app.post("/", subjectsController.createSubjectController);
  app.get("/", subjectsController.listSubjectsController);
  app.put("/:id", subjectsController.putSubjectController);
  app.patch("/:id", subjectsController.patchSubjectController); 
  app.delete("/:id", subjectsController.deleteSubjectController);
}
