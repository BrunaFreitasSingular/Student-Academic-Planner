import type { FastifyInstance } from "fastify";
import * as subjectsController from "../controllers/subjects.controllers.js";

export async function subjectRoutes(app: FastifyInstance) {

  // CRUD
  app.post("/", subjectsController.create);
  app.get("/", subjectsController.list);
  app.put("/:id", subjectsController.put);
  app.patch("/:id", subjectsController.patch); 
  app.delete("/:id", subjectsController.remove);
}
