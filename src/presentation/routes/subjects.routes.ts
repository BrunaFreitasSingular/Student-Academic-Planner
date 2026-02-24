import { FastifyInstance } from "fastify";
import { createSubjectController } from "../controllers/subjects.controllers.js";
import { listSubjectsController } from "../controllers/subjects.controllers.js";
import { putSubjectController } from "../controllers/subjects.controllers.js";
import { deleteSubjectController } from "../controllers/subjects.controllers.js";
import { patchSubjectController } from "../controllers/subjects.controllers.js"

export async function subjectsRoutes(app: FastifyInstance) {
  app.post("/", createSubjectController);
  app.get("/", listSubjectsController);
  app.put("/:id", putSubjectController);
  app.delete("/:id", deleteSubjectController);
  app.patch("/:id", patchSubjectController);
}
