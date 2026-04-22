import { FastifyInstance } from "fastify";
import * as StudentControllers from "../controllers/student.controllers.ts";

export async function studentRoutes(app: FastifyInstance) {
  app.post("/", StudentControllers.createStudentController);
  app.get("/", StudentControllers.listStudentController);
  app.get("/:id", StudentControllers.getStudentByIdController);
  app.post("/login", StudentControllers.loginStudentController);
}
