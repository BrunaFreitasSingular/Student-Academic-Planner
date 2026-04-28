import type { FastifyInstance } from "fastify";
import * as StudentControllers from "../controllers/student.controllers.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { JwtTokenService } from "../../infrastructure/auth/JwtTokenService.ts";

export async function studentRoutes(app: FastifyInstance) {
  app.addHook(
    "preHandler",
    authMiddleware(new JwtTokenService(process.env.JWT_SECRET!)),
  );
  app.post("/", StudentControllers.createStudentController);
  app.get("/", StudentControllers.listStudentController);
  app.get("/:id", StudentControllers.getStudentByIdController);
}
